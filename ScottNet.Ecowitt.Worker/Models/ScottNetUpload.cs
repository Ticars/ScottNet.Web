using Newtonsoft.Json;

namespace ScottNet.Ecowitt.Worker.Models
{
    public class ScottNetUpload
    {
        public ScottNetUpload()
        {
        }
        [JsonProperty("barTrend")]
        public short BarometerTrendCode { get; set; }

        [JsonProperty("bar")]
        public short Barometer { get; set; }

        [JsonProperty("inTemp")]
        public short IndoorTemp { get; set; }

        [JsonProperty("inHum")]
        public byte IndoorHumidity { get; set; }

        [JsonProperty("outHum")]
        public byte OutdoorHumidity { get; set; }

        [JsonProperty("outTemp")]
        public short OutdoorTemp { get; set; }

        [JsonProperty("wndDir")]
        public short WindDirection { get; set; }

        [JsonProperty("wndSpd")]
        public short WindSpeed { get; set; }

        [JsonProperty("cnslDt")]
        public DateTime ConsoleTime { get; set; }
        [JsonProperty("dewPt")]
        public short DewPoint { get; set; }
        [JsonProperty("wndSpd10M")]
        public ushort WindSpeed10M { get; set; }
        [JsonProperty("wndSpd2M")]
        public ushort WindSpeed2M { get; set; }
        [JsonProperty("wndGstSpd10M")]
        public ushort WindGustSpeed10M { get; set; }
        [JsonProperty("wndGstDir10M")]
        public short WindGustDirection10M { get; set; }
        [JsonProperty("rainRate")]
        public ushort RainRate { get; set; }
        [JsonProperty("rainStrm")]
        public ushort RainStorm { get; set; }
        [JsonProperty("rainDay")]
        public ushort RainDay { get; set; }
        [JsonProperty("rainMonth")]
        public ushort RainMonth { get; set; }
        [JsonProperty("rainYear")]
        public ushort RainYear { get; set; }
        [JsonProperty("rain24H")]
        public ushort Rain24Hour { get; set; }
        [JsonProperty("rain1H")]
        public ushort Rain1Hour { get; set; }
        [JsonProperty("rain15M")]
        public ushort Rain15Minutes { get; set; }
        [JsonProperty("cnslVlt")]
        public ushort ConsoleVoltageFactor { get; set; }
        [JsonProperty("fcstIcn")]
        public byte ForecastIconCode { get; set; }
        [JsonProperty("htIdx")]
        public short? HeatIndex { get; set; }
        [JsonProperty("wndChl")]
        public short? WindChill { get; set; }
    }
}
