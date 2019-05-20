using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using LazyCache;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Services.WeatherServices.WeatherModels.DarkSkyModels;
using ScottNet.Web.ViewModels;
using ScottNet.Web.Utilities;
using Microsoft.Extensions.Configuration;

namespace ScottNet.Web.Services.WeatherServices
{
    public class DarkSkyService : IWeatherForecastService
    {
        private readonly ILogger<DarkSkyService> _logger;
        private readonly IMapper _mapper;
        private readonly IAppCache _cache;
        private readonly IConfiguration _configuration;

        public DarkSkyService(ILogger<DarkSkyService> logger, IMapper mapper, IAppCache appCache, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _cache = appCache;
            _configuration = configuration;
        }
        private string GetForecastUrl()
        {
            var baseUrl = _configuration["DarkSky:baseUrl"];
            var apiKey = _configuration["DarkSky:apiKey"];
            var latitude = _configuration["DarkSky:latitude"];
            var longitude = _configuration["DarkSky:longitude"];

            return $"{baseUrl}/forecast/{apiKey}/{latitude},{longitude}";
        }
        private async Task<DarkSkyForecast> CallRestService()
        {
            //TODO: Use configuration
            try
            {
                var httpClient = new HttpClient();
                var response = await httpClient.GetAsync(GetForecastUrl());
                response.EnsureSuccessStatusCode();
                var forecastString = await response.Content.ReadAsStringAsync();
                var forecast = DarkSkyForecast.FromJson(forecastString);
                return forecast;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error calling dark sky forecast");
                return null;
            }
        }

       


        private async Task<DarkSkyForecast> GetDarkSkyForecast()
        {
            Func<Task<DarkSkyForecast>> forecastFactory = () => CallRestService();

            var retVal = await _cache.GetOrAddAsync(Constants.CacheKeys.DarkSkyForecast, forecastFactory, DateTimeOffset.Now.AddMinutes(15));
            return retVal;
        }

        public async Task<ICollection<DailyWeatherForecastViewModel>> GetForecasts()
        {
            DarkSkyForecast forecast = await GetDarkSkyForecast();
            return _mapper.Map<ICollection<DailyWeatherForecastViewModel>>(forecast?.Daily?.Data);
        }
    }
}
