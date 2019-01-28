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
        public double Barometer { get; set; }
        public double IndoorTemp { get; set; }
        public int IndoorHumidity { get; set; }
        public int OutdoorHumidity { get; set; }
        public double OutdoorTemp { get; set; }
        public int WindDirection { get; set; }
        public int WindSpeed { get; set; }
        public double WindSpeed10M { get; set; }
        public double WindSpeed2M { get; set; }
        public int WindGustSpeed10M { get; set; }
        public int WindGustDirection10M { get; set; }
        public double RainRate { get; set; }
        public double RainStorm { get; set; }
        public double RainDay { get; set; }
        public double RainMonth { get; set; }
        public double RainYear { get; set; }
        public double Rain15M { get; set; }
        public double Rain1H { get; set; }
        public double Rain24H { get; set; }
        public int DewPoint { get; set; }
        public int HeatIndex { get; set; }
        public int WindChill { get; set; }
        public bool ForecastRain { get; set; }
        public bool ForecastSnow { get; set; }
        public bool ForecastCloudy { get; set; }
        public bool ForecastSun { get; set; }
        public bool ForecastPartlyCloudy { get; set; }
    }
}
