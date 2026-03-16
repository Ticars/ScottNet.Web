using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models.Ecowitt
{
    public class EcoWittLiveData
    {
        [JsonProperty("common_list")]
        public List<CommonListItem> CommonList { get; set; } = new();

        [JsonProperty("rain")]
        public List<RainItem> Rain { get; set; } = new();

        [JsonProperty("piezoRain")]
        public List<RainItem> PiezoRain { get; set; } = new();

        [JsonProperty("wh25")]
        public List<Wh25Item> Wh25 { get; set; } = new();

        [JsonProperty("debug")]
        public List<DebugItem> Debug { get; set; } = new();
    }
}
