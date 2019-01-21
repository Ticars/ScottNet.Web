using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottNet.Web.Data.Entities
{
    public class WeatherReading
    {

        public int WeatherReadingId { get; set; }
        [Column(TypeName = "DateTime2(1)")]
        public DateTime ConsoleTime { get; set; }
        public BarometricTrend BarometricTrend { get; set; }
        public short? BarometricTrendId { get; set; }
        public float Barometer { get; set; }
        public float IndoorTemp { get; set; }
        public byte IndoorHumidity { get; set; }
        public byte OutdoorHumidity { get; set; }
        public float OutdoorTemp { get; set; }
        public short WindDirection { get; set; }
        public float WindSpeed { get; set; }
        public float WindSpeed10M { get; set; }
        public float WindSpeed2M { get; set; }
        public float WindGustSpeed10M { get; set; }
        public short WindGustDirection10M { get; set; }
        public float RainRate { get; set; }
        public float RainStorm { get; set; }
        //  public DateTime? StormStart { get; set; }
        public float RainDay { get; set; }
        public float RainMonth { get; set; }
        public float RainYear { get; set; }
        public float Rain15M { get; set; }
        public float Rain1H { get; set; }
        public float Rain24H { get; set; }
        public byte ForecastIcon { get; set; }
        public short DewPoint { get; set; }
        public short HeatIndex { get; set; }
        public short WindChill { get; set; }
        public bool ForecastRainIcon { get; set; }
        public bool ForecastSnowIcon { get; set; }
        public bool ForecastCloudyIcon { get; set; }
        public bool ForecastSunIcon { get; set; }
        public bool ForecastPartlyCloudyIcon { get; set; }
    }
}
