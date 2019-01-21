using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace ScottNet.Web.Data.Entities
{
    public class WeatherReadingEntity : TableEntity
    {
        public const string PARTITION_KEY = "Main";
        public const string ROW_KEY = "CURRENT_WEATHER";
        public WeatherReadingEntity(string partitionKey, string rowKey) : base(partitionKey, rowKey)
        {
        }

        public WeatherReadingEntity() : base(PARTITION_KEY, ROW_KEY)
        {

        }
        public int WeatherReadingId { get; set; }
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
        public double ConsoleVoltage { get; set; }
        public int ForecastIcon { get; set; }
        public int DewPoint { get; set; }
        public int HeatIndex { get; set; }
        public int WindChill { get; set; }
        public bool ForecastRainIcon { get; set; }
        public bool ForecastSnowIcon { get; set; }
        public bool ForecastCloudyIcon { get; set; }
        public bool ForecastSunIcon { get; set; }
        public bool ForecastPartlyCloudyIcon { get; set; }
    }
}
