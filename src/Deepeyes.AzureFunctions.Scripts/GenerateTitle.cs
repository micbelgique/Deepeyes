using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.AI.OpenAI;
using Azure;
using Deepeyes.Functions.Models;
using System.Collections.Generic;
using System.Linq;

namespace api
{
    public static class GenerateTitle
    {
        [FunctionName("GenerateTitle")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c order by c._ts desc")]
                IEnumerable<ScanVisionResult> queryResults)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (queryResults.Count() == 0) return new OkObjectResult("First, provide images");

            string prompt = "Based on the title below, generate a simple title for a page." +
                " The title can contains maximum 10 words and don't surround it with quotes :";
            foreach (ScanVisionResult item in queryResults)
            {
                prompt += "'" + item.Captions[0].Text + "', ";
            }

            OpenAIClient client = new OpenAIClient(Environment.GetEnvironmentVariable("OpenAiApiKey"));

            string deploymentName = "text-davinci-003";
            

            Response<Completions> completionsResponse = await client.GetCompletionsAsync(deploymentName, prompt);
            string completion = completionsResponse.Value.Choices[0].Text;

            return new OkObjectResult(completion);
        }
    }
}
