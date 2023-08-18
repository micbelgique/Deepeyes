using System.Collections.Generic;
using Azure.AI.Vision.ImageAnalysis;
using Newtonsoft.Json;

namespace Deepeyes.Functions.Models
{
    public class ScanVisionResult
    {
        public string Id { get; set; }
        public string Image { get; set; }
        public List<Tag> Tags { get; set; }
        public List<Caption> Captions { get; set; }
        public bool IsAdult { get; set; } = false;
        public bool IsGory { get; set; } = false;
        public bool IsRacy { get; set; } = false;
        public double AdultScore { get; set; } = 0;
        public double GoreScore { get; set; } = 0;
        public double RacyScore { get; set; } = 0;
        public List<string> DominantColors { get; set; } = new();
        public string AccentColor { get; set; } = string.Empty;

        public List<Face> Faces { get; set; } = new();

        public List<Object> Objects { get; set; } = new();
        public Ocr Ocr { get; set; } = new();

        public List<FaceAttributes> FacesAttributes { get; set; } = new();

        public DenseCaptions denseCaptions { get; set; } = null;

    }
}
