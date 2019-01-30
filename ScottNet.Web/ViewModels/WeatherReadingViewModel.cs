using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class WeatherReadingViewModel
    {
        public DateTime? ConsoleTime { get; set; }
        public int BarometerTrendCode { get; set; }
        public decimal Barometer { get; set; }
        public decimal IndoorTemp { get; set; }
        public int IndoorHumidity { get; set; }
        public int OutdoorHumidity { get; set; }
        public decimal OutdoorTemp { get; set; }
        public int WindDirection { get; set; }
        public int WindSpeed { get; set; }
        public decimal WindSpeed10M { get; set; }
        public decimal WindSpeed2M { get; set; }
        public int WindGustSpeed10M { get; set; }
        public int WindGustDirection10M { get; set; }
        public decimal RainRate { get; set; }
        public decimal RainStorm { get; set; }
        public decimal RainDay { get; set; }
        public decimal RainMonth { get; set; }
        public decimal RainYear { get; set; }
        public decimal Rain15M { get; set; }
        public decimal Rain1H { get; set; }
        public decimal Rain24H { get; set; }
        public int DewPoint { get; set; }
        public int HeatIndex { get; set; }
        public int WindChill { get; set; }
        public bool ForecastRain { get; set; }
        public bool ForecastSnow { get; set; }
        public bool ForecastCloudy { get; set; }
        public bool ForecastSun { get; set; }
        public bool ForecastPartlyCloudy { get; set; }
        public bool IsFromMemory { get; set; }
    }
}
