using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Deepeyes.Functions.Models;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Deepeyes.Functions
{
  public class TriggerVisionFromBlobToTable
  {

    [FunctionName("TriggerVisionFromBlobToTable")]
    [return: CosmosDB(
               databaseName: "DeepEyesDB",
               collectionName: "ScanVisionResults",
               ConnectionStringSetting = "CosmosDBConnection")]
    public static async Task<ScanVisionResult> Run([BlobTrigger("raw-pics/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob, string name,
                ILogger log)
    {

      log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
      // send the blob to vision api and get the results
      ComputerVisionClient vision = new(new ApiKeyServiceClientCredentials(Environment.GetEnvironmentVariable("ComputerVisionApiKey")), Array.Empty<System.Net.Http.DelegatingHandler>())
      {
        Endpoint = Environment.GetEnvironmentVariable("ComputerVisionEndpoint")
      };

      List<VisualFeatureTypes?> features = new() {
        VisualFeatureTypes.Adult,
        VisualFeatureTypes.Categories,
        VisualFeatureTypes.Color,
        VisualFeatureTypes.Description,
        VisualFeatureTypes.Brands,
        VisualFeatureTypes.Faces,
        VisualFeatureTypes.ImageType,
        VisualFeatureTypes.Objects,
      };

      var result = await vision.AnalyzeImageInStreamAsync(myBlob, visualFeatures: features);

      var tags = result.Description.Tags.ToList();
      var captions = result.Description.Captions.Select(caption => new Caption
      {
        Text = caption.Text,
        Confidence = caption.Confidence
      }).ToList();

      var faces = result.Faces.Select(face => new Face { Age = face.Age, Gender = face.Gender.ToString() }).ToList();

      var objects = result.Objects.Select(obj => new Models.Object
      {
        Name = obj.ObjectProperty,
        Confidence = obj.Confidence
      });

      return new ScanVisionResult { Id = Guid.NewGuid().ToString(), Image = name, Tags = tags, Captions = captions, AccentColor = result.Color.AccentColor, DominantColors = result.Color.DominantColors.ToList(), Faces = faces, Objects = objects.ToList(), IsAdult = result.Adult.IsAdultContent, IsGory = result.Adult.IsGoryContent, IsRacy = result.Adult.IsRacyContent, AdultScore = result.Adult.AdultScore, GoreScore = result.Adult.GoreScore, RacyScore = result.Adult.RacyScore };
    }
  }
}
