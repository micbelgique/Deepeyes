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
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c order by c._ts desc")]
                IEnumerable<ScanVisionResult> queryResults)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (queryResults.Count() == 0) return new OkObjectResult("{\"title\": \"First, provide images\", \"description\": \"\"}");

            string prompt = "We are a website that presents a collection of objects." +
                " Those object can change during the year and we would like to generate the perfect title for our website " +
                "based on the object in our collection. I will give you a list of the object we have for the moment." +
                " And i would like you to generate a single title for the website page that describe the collection." +
                " I also want you to create a small description for the page based on the objects." +
                " Here are the objects : ";

            foreach (ScanVisionResult item in queryResults)
            {
                prompt += "'" + item.Captions[0].Text + "', ";
            }
            prompt += ". Send me those informations in a JSON format, with 2 attributes: \"title\" and \"description\".";
            OpenAIClient client = new OpenAIClient(Environment.GetEnvironmentVariable("OpenAiApiKey"));

            string deploymentName = "text-davinci-003";
            

            Response<Completions> completionsResponse = await client.GetCompletionsAsync(deploymentName, prompt);
            string completion = completionsResponse.Value.Choices[0].Text;

            return new OkObjectResult(completion);
        }
    }
}
