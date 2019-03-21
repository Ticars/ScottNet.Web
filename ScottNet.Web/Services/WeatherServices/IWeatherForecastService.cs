using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.WeatherServices
{
    public interface IWeatherForecastService
    {
        Task<ICollection<DailyWeatherForecastViewModel>> GetForecasts();
    }
}
