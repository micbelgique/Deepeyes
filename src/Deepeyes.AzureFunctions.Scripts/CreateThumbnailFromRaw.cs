using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace DeepEyes.Functions
{
  public class CreateThumbnailFromRaw
  {
    [FunctionName("CreateThumbnailFromRaw")]
    public static async Task Run([BlobTrigger("raw-pics/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob,
    [Blob("thumbnails/{name}", FileAccess.Write)] Stream thumbnail, ILogger log)
    {
      ComputerVisionClient vision = new(new ApiKeyServiceClientCredentials(Environment.GetEnvironmentVariable("ComputerVisionApiKey")), Array.Empty<System.Net.Http.DelegatingHandler>())
      {
        Endpoint = Environment.GetEnvironmentVariable("ComputerVisionEndpoint")
      };
      try
      {
        var result = await vision.GenerateThumbnailInStreamAsync(250, 250, myBlob, true);
        result.CopyTo(thumbnail);
      }
      catch (Exception e)
      {
        log.LogError("Error creating thumbnail: " + e.Message);
      }
    }
  }
}
