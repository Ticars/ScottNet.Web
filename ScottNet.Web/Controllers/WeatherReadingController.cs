using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.Services.AzureStorage;
using ScottNet.Web.ViewModels;
using System.Threading.Tasks;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherReadingController : Controller 
    {
        private readonly ILogger<WeatherReadingController> _logger;
        private readonly IStorageService _storageService;
        private readonly IMapper _mapper;
        private readonly IDataRepository _repository;

        public WeatherReadingController(ILogger<WeatherReadingController> logger, 
            IStorageService storageService, 
            IMapper mapper,
            IDataRepository repository)
        {
            _logger = logger;
            _storageService = storageService;
            _mapper = mapper;
            _repository = repository;
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
            _logger.LogInformation("Current Weather Post {0}", data);
            var storageEntity = _mapper.Map<WeatherReadingStorageEntity>(data);
            await _storageService.AddUpdateCurrentWeather(storageEntity);
            var dbEntity = _mapper.Map<WeatherReading>(data);
            dbEntity.BarometricTrend = await _repository.GetBarometricTrendByCodeAsync(data.BarometerTrendCode);
            dbEntity.BarometricTrendId = dbEntity.BarometricTrend?.Id;
            await _repository.AddEntityAsync(dbEntity);
            await _repository.SaveAllAsync();
            var viewModel = _mapper.Map<WeatherReadingViewModel>(dbEntity);
         
            return Created("/api/WeatherReading/" + dbEntity.Id, viewModel);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<WeatherReadingViewModel>> Current()
        {
            var reading = await _storageService.GetCurrentWeatherAsync();
            return Ok(_mapper.Map<WeatherReadingViewModel>(reading));
        }
    }
}
