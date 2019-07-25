using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public WeatherSummaryController(ILogger<WeatherSummaryController> logger,
          IMapper mapper,
          IDataRepository repository)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<WeatherSummaryViewModel>>> GetAsync()
        {
            var weatherSummaries = await _repository.GetHourlyReadings(DateTime.Now.AddDays(-1));
            var viewModel = _mapper.Map<IEnumerable<WeatherSummaryViewModel>>(weatherSummaries);
            return Ok(viewModel);
        }
    }
}