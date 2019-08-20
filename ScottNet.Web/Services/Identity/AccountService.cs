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

    }
}
