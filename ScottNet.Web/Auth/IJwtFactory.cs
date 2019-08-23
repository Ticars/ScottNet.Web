using ScottNet.Web.Data.Entities;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ScottNet.Web.Auth
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, string email, ClaimsIdentity identity);
     //   ClaimsIdentity GenerateClaimsIdentity(string userName,  string id);
        ClaimsIdentity GenerateClaimsIdentity(AppUser appUser);
    }
}
