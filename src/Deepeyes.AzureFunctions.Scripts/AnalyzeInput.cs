using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Azure;
using Azure.AI.TextAnalytics;
using Azure.Storage.Blobs;
using Deepeyes.Functions.Models;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Extensions.Logging;
using Entity = Deepeyes.Functions.Models.Entity;

// TODO: use singleton to get vision client;

namespace Deepeyes.Functions
{


    public static class AnalyzeInput
    {
        private static readonly Lazy<ComputerVisionClient> lazyComputerVisionClient = new(InitializeComputerVisionClient);
        private static ComputerVisionClient ComputerVisionClient => lazyComputerVisionClient.Value;

        private static ComputerVisionClient InitializeComputerVisionClient()
        {
            return new(new ApiKeyServiceClientCredentials(Environment.GetEnvironmentVariable("CognitiveServicesApiKey")), Array.Empty<System.Net.Http.DelegatingHandler>())
            {
                Endpoint = Environment.GetEnvironmentVariable("CognitiveServicesEndpoint")
            };
        }

        private static readonly Lazy<TextAnalyticsClient> lazyTextAnalyticsClient = new(InitializeTextAnalyticsClient);
        private static TextAnalyticsClient TextAnalyticsClient => lazyTextAnalyticsClient.Value;
        private static TextAnalyticsClient InitializeTextAnalyticsClient()
        {
            return new(new Uri(Environment.GetEnvironmentVariable("CognitiveServicesEndpoint")), new AzureKeyCredential(Environment.GetEnvironmentVariable("CognitiveServicesApiKey")));
        }


        [FunctionName("AnalyzeInput")]
        public static async Task RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context, ILogger log)
        {
            var myBlobName = context.GetInput<string>();

            // Replace "hello" with the name of your Durable Activity Function.
            var scanVisionResult = await context.CallActivityAsync<ScanVisionResult>("AnalyzeInput_DescribeImage", myBlobName);
            await context.CallActivityAsync("AnalyzeInput_SaveResult", scanVisionResult);
            if (scanVisionResult.Ocr.State == "PENDING")
            {
                scanVisionResult.Ocr.State = "RUNNING";
                await context.CallActivityAsync("AnalyzeInput_SaveResult", scanVisionResult);
                var operationId = await context.CallActivityAsync<string>("AnalyzeInput_StartExtractText", myBlobName);
                var textResult = await context.CallActivityAsync<IList<ReadResult>>("AnalyzeInput_ReceiveExtractedText", operationId);

                scanVisionResult.Ocr.Lines = textResult.SelectMany(x => x.Lines.Select(l => l.Text)).ToList();
                scanVisionResult.Ocr = await context.CallActivityAsync<Ocr>("AnalyzeInput_AnalyseText", scanVisionResult.Ocr);
                scanVisionResult.Ocr.State = "DONE";
                await context.CallActivityAsync("AnalyzeInput_SaveResult", scanVisionResult);
            }

        }

        [FunctionName("AnalyzeInput_DescribeImage")]
        public static async Task<ScanVisionResult> DescribeImage([ActivityTrigger] string myBlobName, [Blob("raw-pics/{myBlobName}", FileAccess.Read)] BlobClient myBlob, ILogger log)
        {
            // send the blob to vision api and get the results

            List<VisualFeatureTypes?> features = new() {
                VisualFeatureTypes.Tags,
                VisualFeatureTypes.Adult,
                VisualFeatureTypes.Categories,
                VisualFeatureTypes.Color,
                VisualFeatureTypes.Description,
                VisualFeatureTypes.Brands,
                VisualFeatureTypes.Faces,
                VisualFeatureTypes.ImageType,
                VisualFeatureTypes.Objects,
            };
            var result = await ComputerVisionClient.AnalyzeImageInStreamAsync(myBlob.OpenRead(), features);
            // var result = await ComputerVisionClient.AnalyzeImageAsync(myBlob.Uri.ToString(), visualFeatures: features);

            var id = Guid.NewGuid().ToString();

            var tags = result.Tags.Select(t => new Tag { Name = t.Name, Confidence = t.Confidence }).ToList();
            var captions = result.Description.Captions.Select(caption => new Caption
            {
                Text = caption.Text,
                Confidence = caption.Confidence
            }).ToList();

            var faces = result.Faces.Select(face => new Face { Age = face.Age, Gender = face.Gender.ToString() }).ToList();

            var objects = result.Objects.Select(obj => new Models.Object
            {
                Name = obj.ObjectProperty,
                Confidence = obj.Confidence
            });

            bool hasText = tags.Any(t => t.Name == "text");

            return new ScanVisionResult
            {
                Id = id,
                Image = myBlob.Name,
                Tags = tags,
                Captions = captions,
                AccentColor = result.Color.AccentColor,
                DominantColors = result.Color.DominantColors.ToList(),
                Faces = faces,
                Objects = objects.ToList(),
                IsAdult = result.Adult.IsAdultContent,
                IsGory = result.Adult.IsGoryContent,
                IsRacy = result.Adult.IsRacyContent,
                AdultScore = result.Adult.AdultScore,
                GoreScore = result.Adult.GoreScore,
                RacyScore = result.Adult.RacyScore,
                Ocr = new Ocr
                {
                    State = hasText ? "PENDING" : "NONE"
                }
            };
        }

        [FunctionName("AnalyzeInput_StartExtractText")]
        public static async Task<string> AnalyzeInput_StartExtractText([ActivityTrigger] string myBlobName, [Blob("raw-pics/{myBlobName}", FileAccess.Read)] BlobClient myBlob, ILogger log)
        {
            log.LogInformation("Extracting text from image");

            // send the blob to vision api and get the results
            var textHeaders = await ComputerVisionClient.ReadInStreamAsync(myBlob.OpenRead());
            // var textHeaders = await ComputerVisionClient.ReadAsync(myBlob.Uri.ToString());

            string operationLocation = textHeaders.OperationLocation;

            const int numberOfCharsInOperationId = 36;
            var operationId = operationLocation[^numberOfCharsInOperationId..];
            return operationId;

        }

        [FunctionName("AnalyzeInput_ReceiveExtractedText")]
        public static async Task<IList<ReadResult>> AnalyzeInput_ReceiveExtractedText([ActivityTrigger] IDurableActivityContext context, ILogger log)
        {
            log.LogInformation("Extracting text from image");
            var operationId = context.GetInput<string>();

            ReadOperationResult results;
            do
            {
                results = await ComputerVisionClient.GetReadResultAsync(Guid.Parse(operationId));
                Thread.Sleep(1000);

            } while (results.Status == OperationStatusCodes.Running || results.Status == OperationStatusCodes.NotStarted);

            var textResults = results.AnalyzeResult.ReadResults;

            return textResults;

        }

        [FunctionName("AnalyzeInput_AnalyseText")]
        public static async Task<Ocr> AnalyzeInput_AnalyseText([ActivityTrigger] Ocr ocrResult, ILogger log)
        {
            TextAnalyticsActions actions = new()
            {
                ExtractKeyPhrasesActions = new List<ExtractKeyPhrasesAction>() { new ExtractKeyPhrasesAction() },
                RecognizeEntitiesActions = new List<RecognizeEntitiesAction>() { new RecognizeEntitiesAction() },
            };

            var text = string.Join("\n", ocrResult.Lines);
            if (text.Length > 600)
            {
                actions.ExtractSummaryActions = new List<ExtractSummaryAction>() { new ExtractSummaryAction() };
            }
            var operation = await TextAnalyticsClient.StartAnalyzeActionsAsync(new List<string>() { text }, actions);
            await operation.WaitForCompletionAsync();

            var documentsInPage = await operation.Value.FirstAsync();

            ocrResult.Summaries = documentsInPage.ExtractSummaryResults.SelectMany(s => s.DocumentsResults.SelectMany(d => d.Sentences))
                                                                       .Select(s => new Summary { Confidence = s.RankScore, Text = s.Text })
                                                                       .ToList();
            ocrResult.Entities = documentsInPage.RecognizeEntitiesResults.SelectMany(re => re.DocumentsResults.SelectMany(d => d.Entities))
                                                                         .Select(e => new Entity { Category = e.Category.ToString(), SubCategory = e.SubCategory, Confidence = e.ConfidenceScore, Name = e.Text })
                                                                         .ToList();
            ocrResult.KeyPhrases = documentsInPage.ExtractKeyPhrasesResults.SelectMany(kp => kp.DocumentsResults.SelectMany(d => d.KeyPhrases))
                                                                           .ToList();


            return ocrResult;
        }


        [FunctionName("AnalyzeInput_SaveResult")]
        [return: CosmosDB(
                   databaseName: "DeepEyesDB",
                   collectionName: "ScanVisionResults",
                   ConnectionStringSetting = "CosmosDBConnection")]
        public static ScanVisionResult SaveResult([ActivityTrigger] IDurableActivityContext context, ILogger log)
        {
            log.LogInformation("Saving result");
            return context.GetInput<ScanVisionResult>();
        }

        [FunctionName("AnalyzeInput_BlobStart")]
        public static async Task BlobStart(
            [BlobTrigger("raw-pics/{name}")] BlobClient myBlob,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("AnalyzeInput", input: myBlob.Name);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'. {myBlob.Name}");

        }
    }
}