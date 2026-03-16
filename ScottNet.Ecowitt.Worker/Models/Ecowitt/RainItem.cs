using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models.Ecowitt
{
    public class RainItem : CommonListItem
    {
        
        [JsonProperty("battery")]
        public string? Battery { get; set; }

        [JsonProperty("voltage")]
        public string? Voltage { get; set; }

        [JsonProperty("ws90cap_volt")]
        public string? Ws90CapVolt { get; set; }

        [JsonProperty("ws90_ver")]
        public string? Ws90Ver { get; set; }
    }
}
