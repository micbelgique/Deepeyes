using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using System.Net.Http;
using Microsoft.Azure.Documents.SystemFunctions;

namespace api
{
    public static class SaveGeneratedImage
    {
        [FunctionName("SaveGeneratedImage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string imageUrl = data?.imageUrl;

            string Connection = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
            string containerName = Environment.GetEnvironmentVariable("BlobContainerName");
            HttpClient client = new HttpClient();
            Stream stream = null;
            try
            {
                stream = await client.GetStreamAsync(imageUrl);
            }
            catch (Exception ex)
            {
                log.LogInformation(ex.Message);
                return new BadRequestObjectResult("Failed to fetch image");
            }
            if (stream == null)
            {
                return new BadRequestObjectResult("Failed to fetch image");
            }
           
            string blobName = $"{DateTimeOffset.Now.ToUnixTimeMilliseconds()}-{(new Random().NextDouble() * 100) % 100}.jpg";
            var blobClient = new BlobContainerClient(Connection, containerName);
            var blob = blobClient.GetBlobClient(blobName);
            await blob.UploadAsync(stream);
            return new OkObjectResult("file uploaded successfully");
        }
    }
}
