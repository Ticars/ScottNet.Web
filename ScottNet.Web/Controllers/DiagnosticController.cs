using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Utilities;
using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosticController : Controller
    {
        [HttpGet()]
        public ActionResult Get()
        {
            var diagnostics = new Diagnostics
            {
                AssemblyName = ApplicationInformation.ExecutingAssembly.FullName,
                Version = ApplicationInformation.ExecutingAssemblyVersion.ToString(),
                CompileDate = ApplicationInformation.CompileDate,
                AssemblyLocation = ApplicationInformation.ExecutingAssembly.Location
            };
            return Ok(diagnostics);
        }
    }
}
