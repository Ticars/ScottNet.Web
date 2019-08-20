using System.Threading.Tasks;
using ScottNet.Web.Models;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Services.Identity
{
    public interface ISNAuthenticationService
    {
        Task<ApiResponse<AuthorizationViewModel>> LoginAsync(CredentialsViewModel credentials, string ipAddress = null);
        Task<ApiResponse<AuthorizationViewModel>> RefreshAuthenticationAsync(string refreshToken, string ipAddress = null);
        Task<bool> LogoutAsync(string refreshToken);
    }
}