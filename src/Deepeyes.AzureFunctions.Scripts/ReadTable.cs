using System.Collections.Generic;
using Deepeyes.Functions.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;


namespace Deepeyes.Functions
{

  public class ScanVisionResults
  {
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string Image { get; set; }
    public List<string> Tags { get; set; }
    public List<Caption> Captions { get; set; }


  }


  public static class ReadTable
  {
    [FunctionName("ReadTable")]
    public static IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
     [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c order by c._ts desc")]
                IEnumerable<ScanVisionResults> queryResults)
    {
      return new OkObjectResult(queryResults);
    }
  }
}
