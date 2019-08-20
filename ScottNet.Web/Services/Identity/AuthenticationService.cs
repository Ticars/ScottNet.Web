using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ScottNet.Web.Auth;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.Utilities;
using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.Identity
{
    public class SNAuthenticationService : ISNAuthenticationService
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly IDataRepository _dataRepository;


        public SNAuthenticationService(UserManager<AppUser> userManager, 
            IJwtFactory jwtFactory,
            IDataRepository dataRepository)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _dataRepository = dataRepository;
        }

     

        public async Task<ApiResponse<AuthorizationViewModel>> LoginAsync(CredentialsViewModel credentials, string ipAddress = null)
        {
            var user = await _userManager.FindByNameAsync(credentials.UserName);
            var identity = await GetClaimsIdentity(user, credentials.Password);
            if (identity == null)
            {
                return ApiResponse<AuthorizationViewModel>.GenerateUnauthorizedResponse("Invalid login");
            }

            AuthorizationViewModel loginData = await GenerateAuthorizationObject(identity, user, ipAddress);
            return ApiResponse<AuthorizationViewModel>.GenerateSuccessResponse(loginData);
        }

        public async Task<ApiResponse<AuthorizationViewModel>> RefreshAuthenticationAsync(string refreshToken, string ipAddress = null)
        {
            var user = await _dataRepository.RemoveRefreshToken(refreshToken);
            if (user == null)
            {
                return ApiResponse<AuthorizationViewModel>.GenerateUnauthorizedResponse("Invalid refresh token");
            }
            else
            {
                var claimIdentity = _jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id);
                return ApiResponse<AuthorizationViewModel>.GenerateSuccessResponse(await GenerateAuthorizationObject(claimIdentity, user, ipAddress));
            }
        }

        public async Task<bool> LogoutAsync(string refreshToken)
        {
            var user = await _dataRepository.RemoveRefreshToken(refreshToken);
            return user != null;
        }

        private async Task<AuthorizationViewModel> GenerateAuthorizationObject(ClaimsIdentity identity, AppUser user, string ipAddress=null)
        {
            var authorizationViewModel = new AuthorizationViewModel()
            {
                IdentityId = identity.Claims.Single(c => c.Type == "id").Value,
                Email = user.Email,
                UserName = user.UserName,
                Token = await _jwtFactory.GenerateEncodedToken(user.Id, user.Email, identity),
                RefreshToken = (await _dataRepository.AddRefreshToken(user, ipAddress)).Token,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return authorizationViewModel;
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(AppUser userToVerify, string password)
        {
            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userToVerify.UserName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}