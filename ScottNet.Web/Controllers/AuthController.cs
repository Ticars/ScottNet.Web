using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ScottNet.Web.Auth;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.Services.Identity;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly ISNAuthenticationService _authenticationService;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, ISNAuthenticationService authenticationService)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _authenticationService = authenticationService;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var response = await _authenticationService.LoginAsync(credentials, Request.HttpContext.Connection.RemoteIpAddress.ToString());
            if(response.StatusCode == StatusCodes.Status200OK)
            {
                return Ok(response.ResponseObject);
            }
            else
            {
                return Unauthorized(response.Message);
            }
        }

        // POST api/auth/refresh
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody]string refreshToken)
        {
            var removed = await _authenticationService.LogoutAsync(refreshToken);
            return Ok();
        }

        // POST api/auth/refresh
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody]string refreshToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var response = await _authenticationService.RefreshAuthenticationAsync(refreshToken, Request.HttpContext.Connection.RemoteIpAddress.ToString());
            if (response.StatusCode == StatusCodes.Status200OK)
            {
                return Ok(response.ResponseObject);
            }
            else
            {
                return Unauthorized(response.Message);
            }
        }


    }
}