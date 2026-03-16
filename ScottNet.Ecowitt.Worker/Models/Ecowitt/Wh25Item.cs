using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models.Ecowitt
{
    public class Wh25Item
    {
        [JsonProperty("intemp")]
        public string? InTemp { get; set; }

        [JsonProperty("unit")]
        public string? Unit { get; set; }

        [JsonProperty("inhumi")]
        public string? InHumi { get; set; }

        [JsonProperty("abs")]
        public string? Abs { get; set; }

        [JsonProperty("rel")]
        public string? Rel { get; set; }
    }
}
