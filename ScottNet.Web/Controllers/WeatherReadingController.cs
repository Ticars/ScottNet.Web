using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        public WeatherReadingController(ILogger<WeatherReadingController> logger, IStorageService storageService, IMapper mapper)
        {
            _logger = logger;
            _storageService = storageService;
            _mapper = mapper;
        }



        [HttpGet("[action]")]
        public async Task<ActionResult<WeatherReadingViewModel>> Current()
        {
            var reading = await _storageService.GetCurrentWeatherAsync();
            return Ok(_mapper.Map<WeatherReadingViewModel>(reading));
        }
    }
}
