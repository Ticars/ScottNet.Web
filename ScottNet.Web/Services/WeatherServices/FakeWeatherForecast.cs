using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.WeatherServices
{
    public class FakeWeatherForecast : IWeatherForecastService
    {
        public Task<ICollection<DailyWeatherForecastViewModel>> GetForecasts()
        {
            return Task.FromResult<ICollection<DailyWeatherForecastViewModel>>(new DailyWeatherForecastViewModel[] {
                new DailyWeatherForecastViewModel(DateTime.Today.AddDays(1), 42.2M, 33.9M, "Clear"),
                new DailyWeatherForecastViewModel(DateTime.Today.AddDays(2), 48.2M, 39.9M, "Rain"),
                new DailyWeatherForecastViewModel(DateTime.Today.AddDays(3), 46.2M, 35.9M, "Cloudy")
            });
        }

     
    }
}
