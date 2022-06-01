using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Services;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        public SampleDataController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly IEmailService _emailService;

        [HttpGet("Log/{logMessage}")]
        public ActionResult TestLogger(string logMessage)
        {
            System.Diagnostics.Trace.WriteLine($"{DateTime.Now.ToLongTimeString()} Trace: ${logMessage}");
            return Ok(logMessage);
        }
        [HttpPost("[action]")]
        public void SendEmail()
        {
          //  _emailService.SendHtmlMessage("ticars@yahoo.com", "Test", "<b>This is a test </b>");
        }
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
