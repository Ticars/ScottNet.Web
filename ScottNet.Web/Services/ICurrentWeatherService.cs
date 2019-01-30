using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public interface ICurrentWeatherStore
    {
        WeatherReadingViewModel GetLatestWeatherReading();
        void SetLatestWeatherReading(WeatherReadingViewModel currentWeather, bool isFromMemory = true);
    }
}
