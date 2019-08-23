using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.ViewModels;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.Identity
{
    public interface IAccountService
    {
        Task<ApiResponse<bool>> CreateAccountAsync(RegistrationViewModel registrationViewModel);
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<ApiResponse<bool>> ResendAccountConfirmationAsync(string email);
    }
}