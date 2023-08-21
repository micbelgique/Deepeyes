using Azure.AI.Vision.ImageAnalysis;
using System.Drawing;

namespace Deepeyes.Functions.Models
{
    public class BoxCaption
    {
        public string Content { get;set; }
        public double Confidence { get;set; }
        public Rectangle BoundingBox { get; set; }

        public BoxCaption(ContentCaption contentCaption) {
            if (contentCaption == null)
            {
                return;
            }
            Content = contentCaption.Content;
            Confidence = contentCaption.Confidence;
            BoundingBox = contentCaption.BoundingBox;
        }
    }
}
