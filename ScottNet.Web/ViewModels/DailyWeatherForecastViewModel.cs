using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class DailyWeatherForecastViewModel
    {
        public DailyWeatherForecastViewModel()
        {

        }
        public DailyWeatherForecastViewModel(DateTime day, decimal high, decimal low, string description)
        {
            Day = day;
            TemperatureHigh = high;
            TemperatureLow = low;
            Description = description;
        }
        
        public DateTime Day { get; set; }
        public decimal TemperatureHigh { get; set; }
        public decimal TemperatureLow { get; set; }
        public string Description { get; set; }
        
    }
}
