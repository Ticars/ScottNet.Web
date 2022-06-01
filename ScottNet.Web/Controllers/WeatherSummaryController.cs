using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Services;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherSummaryController : Controller
    {
        private readonly ILogger<WeatherSummaryController> _logger;
        private readonly IMapper _mapper;
        private readonly IDataRepository _repository;
        private readonly IConfiguration _configuration;

        public WeatherSummaryController(ILogger<WeatherSummaryController> logger,
          IMapper mapper,
          IDataRepository repository,
          IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<WeatherSummaryViewModel>>> GetAsync()
        {
            int period;
            if(!Int32.TryParse(_configuration["WeatherChartSettings:MinutePeriod"], out period))
            {
                period = 15;
            }
            var weatherSummaries = await _repository.GetSummaryReadings(period, DateTime.Now.AddHours(-36));
            var viewModel = _mapper.Map<IEnumerable<WeatherSummaryViewModel>>(weatherSummaries);
            return Ok(viewModel);
        }
    }
}