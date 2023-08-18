using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using Azure.AI.OpenAI;
using Azure;

namespace api
{
    public static class GenerateImage
    {
        
        [FunctionName("GenerateImage")]
        public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            string prompt = data?.prompt;

            if (string.IsNullOrEmpty(prompt))
            {
                return new BadRequestObjectResult("Please provide a valid prompt.");
            }

            OpenAIClient client = new OpenAIClient(Environment.GetEnvironmentVariable("OpenAiApiKey"));

            Response<ImageGenerations> imageGenerations = await client.GetImageGenerationsAsync( new ImageGenerationOptions()
            {
                Prompt = prompt,
                Size = ImageSize.Size512x512,
            });

            // Image Generations responses provide URLs you can use to retrieve requested images
            Uri imageUri = imageGenerations.Value.Data[0].Url;
            if (!string.IsNullOrEmpty(imageUri.ToString()))
            {
                return new OkObjectResult(imageUri);
            }
            return new BadRequestObjectResult("Failed to generate an image.");

           
        }
    }
}
