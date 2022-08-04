using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Newtonsoft.Json;
using Deepeyes.Functions.Models;
using Azure;



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
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
         [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c order by c._ts desc")]
                IEnumerable<ScanVisionResults> queryResults,
            ILogger log)
        {

          

            List<ScanVisionResults> response = new();
            // Execute the query and loop through the results
            foreach (ScanVisionResults entity in queryResults)
            {
                response.Add(entity);
                // log.LogInformation($"{entity.PartitionKey}\t{entity.RowKey}\t{entity.Timestamp}\t{entity.Image}");
            }
            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
         
            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(response);
        }
    }
}
