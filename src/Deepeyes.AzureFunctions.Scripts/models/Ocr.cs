using System.Collections.Generic;

namespace Deepeyes.Functions.Models
{
    public class Ocr
    {
        public string State { get; set; } = "NONE";
        public List<string> Lines { get; set; } = new List<string>();
    }
}
