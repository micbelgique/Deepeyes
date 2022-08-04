using System.Collections.Generic;
using Azure.Data.Tables;

namespace Deepeyes.Functions.Models
{
  public class ScanVisionResults
  {
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string Image { get; set; }
    public List<string> Tags { get; set; }
    public List<Caption> Captions { get; set; }
  }
}
