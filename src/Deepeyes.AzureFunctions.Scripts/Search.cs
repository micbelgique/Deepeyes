using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Deepeyes.Functions.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Deepeyes.AzureFunctions.Scripts
{
    public static class Search
    {
        [FunctionName("Search")]
        public static async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c order by c._ts desc")]
                IEnumerable<ScanVisionResult> queryResults,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string query = req.Query["q"];
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            query ??= data?.q;
            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("DeepEyesDB", "ScanVisionResults");
            if (query == null)
            {
                return new BadRequestObjectResult("Please pass a value on the query string or in the request body");
            }
            var response = queryResults
                .Where(svr => svr.Captions.Any(c => c.Text.Contains(query)) ||
                                svr.Tags.Any(t => t.Name.Contains(query)) ||
                                svr.Objects.Any(o => o.Name.Contains(query))
                );
            return new OkObjectResult(response);

        }
    }
}
