using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Deepeyes.Functions.Models;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Deepeyes.Functions
{
  public class TriggerVisionFromBlobToTable
  {

    [FunctionName("TriggerVisionFromBlobToTable")]
    [return: CosmosDB(
               databaseName: "DeepEyesDB",
               collectionName: "ScanVisionResults",
               ConnectionStringSetting = "CosmosDBConnection")]
    public static async Task<ScanVisionResult> Run([BlobTrigger("raw-pics/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob, string name,
                ILogger log)
    {

      log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
      // send the blob to vision api and get the results
      ComputerVisionClient vision = new(new ApiKeyServiceClientCredentials(Environment.GetEnvironmentVariable("ComputerVisionApiKey")), Array.Empty<System.Net.Http.DelegatingHandler>())
      {
        Endpoint = Environment.GetEnvironmentVariable("ComputerVisionEndpoint")
      };

      var results = await vision.DescribeImageInStreamAsync(myBlob);
      var tags = results.Tags.ToList();
      var captions = results.Captions.Select(caption => new Caption
      {
        Text = caption.Text,
        Confidence = caption.Confidence
      }).ToList();

      return new ScanVisionResult { Id = Guid.NewGuid().ToString(), Image = name, Tags = tags, Captions = captions };
    }
  }
}
