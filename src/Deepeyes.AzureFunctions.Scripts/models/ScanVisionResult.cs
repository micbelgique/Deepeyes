using System.Collections.Generic;


namespace Deepeyes.Functions.Models
{
  public class ScanVisionResult
  {
    public string Id { get; set; }
    public string Image { get; set; }
    public List<string> Tags { get; set; }
    public List<Caption> Captions { get; set; }
  }
}
