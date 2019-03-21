using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Services.WeatherServices;
using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ForecastController : Controller
    {
        private readonly ILogger<ForecastController> _logger;
        private readonly IWeatherForecastService _weatherForecastService;

        public ForecastController(ILogger<ForecastController> logger, IWeatherForecastService weatherForecastService)
        {
            _logger = logger;
            _weatherForecastService = weatherForecastService;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<DailyWeatherForecastViewModel>>> Daily()
        {
            return Ok(await _weatherForecastService.GetForecasts());
        }
    }
}
