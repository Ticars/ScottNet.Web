using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.Services.AzureStorage;
using ScottNet.Web.ViewModels;
using System;
using System.Threading.Tasks;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherReadingController : Controller 
    {
        private readonly ILogger<WeatherReadingController> _logger;
        private readonly IMapper _mapper;
        private readonly IDataRepository _repository;
        private readonly ICurrentWeatherStore _currentWeather;

        public WeatherReadingController(ILogger<WeatherReadingController> logger, 
            IMapper mapper,
            IDataRepository repository,
            ICurrentWeatherStore currentWeather)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
            _currentWeather = currentWeather;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherReadingViewModel>> GetAsync(int id)
        {
            var weatherReading = await _repository.GetWeatherReadingAsync(id);
            var viewModel = _mapper.Map<WeatherReadingViewModel>(weatherReading);
            return Ok(viewModel);
        }

        

        [HttpPost()]
        public async Task<ActionResult> PostAsync([FromBody] ConsoleReadingViewModel data)
        {
            try
            {
                _logger.LogInformation("Current Weather Post {0}", data);
                var weatherViewModel = _mapper.Map<WeatherReadingViewModel>(data);
                _currentWeather.SetLatestWeatherReading(weatherViewModel);
                var dbEntity = _mapper.Map<WeatherReading>(data);
                dbEntity.BarometricTrend = await _repository.GetBarometricTrendByCodeAsync(data.BarometerTrendCode);
                dbEntity.BarometricTrendId = dbEntity.BarometricTrend?.Id;
                await _repository.AddEntityAsync(dbEntity);
                await _repository.SaveAllAsync();

                return Created("/api/WeatherReading/" + dbEntity.Id, weatherViewModel);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error posting current weather");
                return BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        [EnableCors]
        public async Task<ActionResult<WeatherReadingViewModel>> Current()
        {
            var reading = _currentWeather.GetLatestWeatherReading();
            if(reading == null)
            {
                reading = _mapper.Map<WeatherReadingViewModel>(await _repository.GetMostRecentReadingAsync());
                _currentWeather.SetLatestWeatherReading(reading, false);
            }
            return reading;
        }
    }
}
