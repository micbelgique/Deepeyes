using System.Collections.Generic;

namespace Deepeyes.Functions.Models
{
  public class ScanVisionResult
  {
    public string Id { get; set; }
    public string Image { get; set; }
    public List<string> Tags { get; set; }
    public List<Caption> Captions { get; set; }
    public bool IsAdult { get; set; } = false;
    public List<string> DominantColors { get; set; } = new();
    public string AccentColor { get; set; } = string.Empty;

    public List<Face> Faces { get; set; } = new();

    public List<Object> Objects { get; set; } = new();
  }
}
