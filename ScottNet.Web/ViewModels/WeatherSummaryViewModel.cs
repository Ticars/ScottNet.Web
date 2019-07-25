using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class WeatherSummaryViewModel
    {
        public DateTime ReadingTime { get; set; }
        public string ReadingTimeString { get; set; }
        public DateTime SummaryTime { get; set; }
        public string SummaryTimeString { get; set; }
        public decimal  OutdoorTemp { get; set; }
        public decimal IndoorTemp { get; set; }
    }
}
