using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models.Ecowitt
{
    public class CommonListItem
    {
        public const string HEX_PREFIX = "0x";

        [JsonProperty("id")]
        public string? Id { get; set; }


        [JsonProperty("val")]
        public string? Val { get; set; }

        [JsonProperty("unit")]
        public string? Unit { get; set; }
    }
}
