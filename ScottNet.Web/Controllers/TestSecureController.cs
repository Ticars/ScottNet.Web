using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ScottNet.Web.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class TestSecureController : ControllerBase
    {
        [HttpGet]
        public string[] GetAsync()
        {
            return new string[] { "First", "Second" };
        }

        [AllowAnonymous()]
        [HttpGet("unsecure")]
        public string[] GetUnsecure()
        {
            return new string[] { "Third", "Fourth", "Fifth" };
        }
    }
}