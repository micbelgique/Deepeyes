using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.AI.Vision.Common;
using Azure.AI.Vision.ImageAnalysis;
using Azure;
using System.Reflection.Metadata;
using System.Linq;

namespace api
{
    public static class VisionTest
    {
        [FunctionName("VisionTest")]
        public static async Task<String> Run(
            [HttpTrigger(AuthorizationLevel.Function,"post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

           

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            String url= data?.url;

            // send the blob to vision api and get the results
            var serviceOptions = new VisionServiceOptions(
                Environment.GetEnvironmentVariable("ComputerVisionApiKey"),
                new AzureKeyCredential(Environment.GetEnvironmentVariable("ComputerVisionEndpoint"))
            );

            using var imageSource = VisionSource.FromUrl(
            new Uri("https://learn.microsoft.com/azure/cognitive-services/computer-vision/media/quickstarts/presentation.png"));

            var analysisOptions = new ImageAnalysisOptions()
            {
                Features = ImageAnalysisFeature.Caption | ImageAnalysisFeature.Text,

                Language = "en",

                GenderNeutralCaption = true
            };

            using var analyzer = new ImageAnalyzer(serviceOptions, imageSource, analysisOptions);

            var result = analyzer.Analyze();

            if (result.Reason == ImageAnalysisResultReason.Analyzed)
            {
                if (result.Caption != null)
                {
                    Console.WriteLine(" Caption:");
                    Console.WriteLine($"   \"{result.Caption.Content}\", Confidence {result.Caption.Confidence:0.0000}");
                }

                if (result.Text != null)
                {
                    Console.WriteLine($" Text:");
                    foreach (var line in result.Text.Lines)
                    {
                        string pointsToString = "{" + string.Join(',', line.BoundingPolygon.Select(pointsToString => pointsToString.ToString())) + "}";
                        Console.WriteLine($"   Line: '{line.Content}', Bounding polygon {pointsToString}");

                        foreach (var word in line.Words)
                        {
                            pointsToString = "{" + string.Join(',', word.BoundingPolygon.Select(pointsToString => pointsToString.ToString())) + "}";
                            Console.WriteLine($"     Word: '{word.Content}', Bounding polygon {pointsToString}, Confidence {word.Confidence:0.0000}");
                        }
                    }
                }
                return "ça marche";
            }
            else
            {
                var errorDetails = ImageAnalysisErrorDetails.FromResult(result);
                Console.WriteLine(" Analysis failed.");
                Console.WriteLine($"   Error reason : {errorDetails.Reason}");
                Console.WriteLine($"   Error code : {errorDetails.ErrorCode}");
                Console.WriteLine($"   Error message: {errorDetails.Message}");
                return null;
            }
        }
    }
}
