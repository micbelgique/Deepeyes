using System;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Deepeyes.Functions
{
  public class TriggerVisionFromBlobToTable
  {
    public class ScanVisionResults
    {
      public string PartitionKey { get; set; }
      public string RowKey { get; set; }
      public string Image { get; set; }
      public string[] Tags { get; set; }
    }

    [FunctionName("TriggerVisionFromBlobToTable")]
    [return: Table("ScanVisionResults", Connection = "CosmosDBConnection")]
    public static ScanVisionResults Run([BlobTrigger("raw-pics/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob, string name, ILogger log)
    {

      log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
      return new ScanVisionResults { PartitionKey = "Vision", RowKey = Guid.NewGuid().ToString(), Image = name, Tags = new string[] { "Can", "Coke", "No Sugar" } };
    }
  }
}
