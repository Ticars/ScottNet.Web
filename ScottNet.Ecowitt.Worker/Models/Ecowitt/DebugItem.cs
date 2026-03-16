using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models.Ecowitt
{
    public class DebugItem
    {
        [JsonProperty("heap")]
        public string? Heap { get; set; }

        [JsonProperty("runtime")]
        public string? Runtime { get; set; }

        [JsonProperty("usr_interval")]
        public string? UsrInterval { get; set; }
    }
}
