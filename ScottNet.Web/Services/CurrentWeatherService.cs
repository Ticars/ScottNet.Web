using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Services
{
    public class CurrentWeatherStore : ICurrentWeatherStore
    {
     
        private WeatherReadingViewModel _currentWeather;

      
        public WeatherReadingViewModel GetLatestWeatherReading()
        {
            return _currentWeather;
        }

        public void SetLatestWeatherReading(WeatherReadingViewModel currentWeather, bool isFromMemory = true)
        {
            currentWeather.IsFromMemory = isFromMemory;
            _currentWeather = currentWeather;
        }
    }
}
