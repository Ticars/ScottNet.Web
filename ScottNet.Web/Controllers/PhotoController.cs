using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Controllers
{

    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoImportService _photoImport;
        private readonly IDataRepository _dataRepository;
        private readonly IMapper _mapper;

        public PhotoController(UserManager<AppUser> userManager,
            IPhotoImportService photoImport,
            IDataRepository dataRepository,
            IMapper mapper)
        {
            _userManager = userManager;
            _photoImport = photoImport;
            _dataRepository = dataRepository;
            _mapper = mapper;
        }

        [HttpPost, RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
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

        [HttpGet("random")]
        [AllowAnonymous()]
        public async Task<ImageGroupViewModel> GetRandomImage()
        {
            var image = await _dataRepository.GetRandomPhoto();
            return _mapper.Map<ImageGroupViewModel>(image);
        }
    }
}