using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Utilities;

namespace ScottNet.Web.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/secure/[controller]")]
    [ApiController]
    public class TestSecureController : ControllerBase
    {
        [HttpGet]
        public string[] GetAsync()
        {
            return new string[] { "First", "Second" };
        }

        [AllowAnonymous]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {

                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    //var fullPath = Path.Combine(pathToSave, fileName);
                    //var dbPath = Path.Combine(folderName, fileName);
                    var stream = ImageFunctions.AutoOrient(file.OpenReadStream());
                    
                    return Ok(new { file.Length });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [AllowAnonymous]
        [HttpPost("unsecure")]
        public string[] PostUnsecureAsync([FromBody]string randomText)
        {
            Console.WriteLine(randomText);
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