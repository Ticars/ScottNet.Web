using Newtonsoft.Json;
using ScottNet.Web.Auth;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ScottNet.Web.Utilities
{
    public class Tokens
    {
        public static async Task<AuthorizationViewModel> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, AppUser user, JwtIssuerOptions jwtOptions)
        {
            var loginToken = new AuthorizationViewModel()
            {
                IdentityId = identity.Claims.Single(c => c.Type == "id").Value,
                Email = user.Email,
                UserName = user.UserName,
                Token = await jwtFactory.GenerateEncodedToken(user.Id, user.Email, identity),
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return loginToken;
        }
    }
}
