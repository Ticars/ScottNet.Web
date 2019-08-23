using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.Utilities;
using ScottNet.Web.ViewModels;
using System;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.Identity
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IDataRepository _dataRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AccountService(UserManager<AppUser> userManager,
            IDataRepository dataRepository,
            IMapper mapper,
            IEmailService emailService)
        {
            _userManager = userManager;
            _dataRepository = dataRepository;
            _mapper = mapper;
            _emailService = emailService;
        }


        public async Task<ApiResponse<bool>> CreateAccountAsync(RegistrationViewModel registrationViewModel)
        {
            var userIdentity = _mapper.Map<AppUser>(registrationViewModel);
            IdentityResult result = await _userManager.CreateAsync(userIdentity, registrationViewModel.Password);

            if (!result.Succeeded) return ApiResponse<bool>.GenerateBadRequestResponse(String.Join('\n', result.Errors.Select(e => e.Description)));
            await SendAccountConfirmationAsync(await _userManager.FindByIdAsync(userIdentity.Id));
            return ApiResponse<bool>.GenerateSuccessResponse(true);
        }

        public async Task<bool> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return false;
            }
            else
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                return result.Succeeded;
            }
        }

        public async Task SendAccountConfirmationAsync(AppUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var callbackUrl = $"{ScottNetHttpContext.AppBaseUrl}/account/confirm?userId={Uri.EscapeDataString(user.Id)}&token={Uri.EscapeDataString(token)}";


            string email = $"Please confirm your account for ScottTicar.Net by <a href='{callbackUrl}'>clicking here</a>.";
            _emailService.SendHtmlMessage(user.Email, "ScottTicar.Net Account Confirmation", email);
        }

        public async Task<ApiResponse<bool>> ResendAccountConfirmationAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return ApiResponse<bool>.GenerateBadRequestWithError(Constants.ApiErrorCodes.ResendEmailInvalidEmail, "Email has not been registered.");
            if (user.EmailConfirmed) return ApiResponse<bool>.GenerateBadRequestWithError(Constants.ApiErrorCodes.ResendEmailAccountVerified, "Account has already been verified.");
            await SendAccountConfirmationAsync(user);
            return ApiResponse<bool>.GenerateSuccessResponse(true);
        }

        public async Task<ApiResponse<bool>> SendPasswordResetEmail(string lastName, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null || !user.EmailConfirmed || !user.LastName.Equals(lastName, StringComparison.CurrentCultureIgnoreCase))
            {
                return ApiResponse<bool>.GenerateBadRequestWithError(Constants.ApiErrorCodes.ResetRequestInvalid, "Email and last name does not match a registered account");
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = $"{ScottNetHttpContext.AppBaseUrl}/account/resetPassword?userId={Uri.EscapeDataString(user.Id)}&token={Uri.EscapeDataString(token)}";

            string emailMessage = $"Please reset the password for your account for ScottTicar.Net by <a href='{callbackUrl}'>clicking here</a>.";
            _emailService.SendHtmlMessage(user.Email, "ScottTicar.Net Password Reset", emailMessage);
            return ApiResponse<bool>.GenerateSuccessResponse(true);
        }

        public async Task<ApiResponse<bool>> ResetPassword(string userId, string token, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return ApiResponse<bool>.GenerateBadRequestWithError(Constants.ApiErrorCodes.PasswordResetInvalidEmail, "Invalid email address");
            }
            var result = await _userManager.ResetPasswordAsync(user, token, password);
            if(!result.Succeeded)
            {
                return ApiResponse<bool>.GenerateBadRequestWithError(Constants.ApiErrorCodes.PasswordResetInternalError, String.Join('\n', result.Errors.Select(e => e.Description)));
            }
            return ApiResponse<bool>.GenerateSuccessResponse(true);
        }
    }
}
