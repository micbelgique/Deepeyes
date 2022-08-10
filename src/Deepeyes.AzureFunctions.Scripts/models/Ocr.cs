using System.Collections.Generic;

namespace Deepeyes.Functions.Models
{
    public class Ocr
    {
        public string State { get; set; } = "NONE";
        public List<string> Lines { get; set; } = new List<string>();
        public List<Entity> Entities { get; set; } = new List<Entity>();
        public List<string> KeyPhrases { get; set; } = new List<string>();
        public List<Summary> Summaries { get; set; } = new List<Summary>();
    }
}
