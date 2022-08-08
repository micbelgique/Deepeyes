using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Deepeyes.AzureFunctions.Scripts
{
    public static class DeleteItem
    {
        [FunctionName("DeleteItem")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection", Id = "{Query.id}", PartitionKey = "{Query.id}")] Document document,
            [CosmosDB(
                databaseName: "DeepEyesDB",
                collectionName: "ScanVisionResults",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
                [Blob("raw-images/{Query.imageId}", FileAccess.ReadWrite)] BlobClient rawImage,
                [Blob("thumbnails/{Query.imageId}", FileAccess.ReadWrite)] BlobClient thumbnail,
            ILogger log)
        {
            string id = req.Query["id"];

            if (document == null || string.IsNullOrEmpty(id))
                return new BadRequestResult();
            Task[] tasks = {
                rawImage.DeleteIfExistsAsync(),
                thumbnail.DeleteIfExistsAsync(),
                client.DeleteDocumentAsync(document.SelfLink, new RequestOptions() { PartitionKey = new PartitionKey(id) })
            };
            await Task.WhenAll(tasks);

            return new OkResult();
        }
    }
}
