using System.Collections.Generic;
using System.Linq;

namespace Deepeyes.Functions.Models
{
    public class FaceAttributes
    {
        public double Age { get; set; }
        public Emotion Emotion { get; set; }
        public string Gender { get; set; }
        public string Glasses { get; set; }
        public FacialHair FacialHair { get; set; }
        public List<Accessory> Accessories { get; set; }
        public double Smile { get; set; }
        public Makeup Makeup { get; set; }


        public FaceAttributes(Microsoft.Azure.CognitiveServices.Vision.Face.Models.FaceAttributes facialAttributes)
        {
            if (facialAttributes == null)
            {
                return;
            }
            Age = facialAttributes.Age ?? -1;
            Emotion = new Emotion
            {
                Anger = facialAttributes.Emotion.Anger,
                Contempt = facialAttributes.Emotion.Contempt,
                Disgust = facialAttributes.Emotion.Disgust,
                Fear = facialAttributes.Emotion.Fear,
                Happiness = facialAttributes.Emotion.Happiness,
                Neutral = facialAttributes.Emotion.Neutral,
                Sadness = facialAttributes.Emotion.Sadness,

            };
            Gender = facialAttributes.Gender.ToString();
            Glasses = facialAttributes.Glasses.ToString();
            FacialHair = new FacialHair
            {
                Moustache = facialAttributes.FacialHair.Moustache,
                Beard = facialAttributes.FacialHair.Beard,
                Sideburns = facialAttributes.FacialHair.Sideburns
            };
            Accessories = facialAttributes.Accessories.Select(a => new Accessory()
            {
                Type = a.Type.ToString(),
                Confidence = a.Confidence
            }).ToList();
            Smile = facialAttributes.Smile ?? -1;
            Makeup = new Makeup
            {
                EyeMakeup = facialAttributes.Makeup.EyeMakeup,
                LipMakeup = facialAttributes.Makeup.LipMakeup
            };

        }
    }
}
