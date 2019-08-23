using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.Services.Identity;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;

        public AccountController(UserManager<AppUser> userManager,
            IMapper mapper,
            IAccountService accountService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var response = await _accountService.CreateAccountAsync(model);
            return response.GetResponseObject();
        }

        [HttpPost("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailViewModel confirmEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("UserId and TOken are required");
            }

            var result = await _accountService.ConfirmEmailAsync(confirmEmail.UserId, confirmEmail.Token);
            if (result) return Ok(); else return Unauthorized();

        }

        [HttpPost("resendEmail")]
        public async Task<IActionResult> ResendEmail([FromBody]string email)
        {
            var resendResult = await _accountService.ResendAccountConfirmationAsync(email);
            return resendResult.GetResponseObject(); 
        }
    }
}