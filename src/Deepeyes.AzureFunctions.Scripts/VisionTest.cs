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
        public static async Task<DenseCaptions> Run(
            [HttpTrigger(AuthorizationLevel.Function,"post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");


            // send the blob to vision api and get the results
            var serviceOptions = new VisionServiceOptions(
                Environment.GetEnvironmentVariable("ComputerVisionEndpoint"),
                new AzureKeyCredential(Environment.GetEnvironmentVariable("ComputerVisionApiKey"))
            );

            var analysisOptions = new ImageAnalysisOptions()
            {
                Features = ImageAnalysisFeature.DenseCaptions,

                Language = "en",

                GenderNeutralCaption = false
            };
            string url = "https://deepeyes0822sa.blob.core.windows.net/raw-pics/1692615141955-34.41135540451255.jpg";
            using (VisionSource imageStream = VisionSource.FromUrl(url))
            {
                using (var analyzer = new ImageAnalyzer(serviceOptions, imageStream, analysisOptions))
                {
                    
                    var result = await analyzer.AnalyzeAsync();
                    
                    if (result.Reason == ImageAnalysisResultReason.Analyzed && result.DenseCaptions != null)
                    {
                        return result.DenseCaptions;
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
    }
}
