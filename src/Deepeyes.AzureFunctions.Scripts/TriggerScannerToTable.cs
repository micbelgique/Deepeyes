using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Deepeyes.Functions
{
  public static class TriggerScannerToTable
  {
    public class ScanVisionResults
    {
      public string PartitionKey { get; set; }
      public string RowKey { get; set; }
      public string Image { get; set; }
      public string[] Tags { get; set; }
    }

    [FunctionName("TriggerScannerToTable")]
    [return: Table("ScanVisionResults")]
    public static async Task<ScanVisionResults> TableOutput(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      dynamic data = JsonConvert.DeserializeObject(requestBody);
      string image = data?.image;
      log.LogInformation("Image:" + image);
      return new ScanVisionResults { PartitionKey = "Vision", RowKey = Guid.NewGuid().ToString(), Image = image, Tags = new string[] { "Can", "Coke", "No Sugar" } };
    }
  }
}
