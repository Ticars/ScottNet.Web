using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.Utilities;

namespace ScottNet.Web.Controllers
{

    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoImportService _photoImport;

        public PhotoController(UserManager<AppUser> userManager, IPhotoImportService photoImport)
        {
            _userManager = userManager;
            _photoImport = photoImport;
        }


        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                var file = Request.Form.Files[0];
                
                if (file.Length > 0)
                {
                    var fileName = file.FileName;
                    var description = Request.Form["description"].FirstOrDefault();
                    await _photoImport.UploadPhotoVersionsAsync(user, file.OpenReadStream(), fileName, description);

                    return Ok(new { file.Length });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> UploadotherAsync()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    var fileName = file.FileName;
                    var description = Request.Form["description"].FirstOrDefault();
                    await _photoImport.UploadPhotoVersionsAsync(user, file.OpenReadStream(), fileName, description);

                    return Ok(new { file.Length });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }


    }
}