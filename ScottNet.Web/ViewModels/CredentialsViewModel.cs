using FluentValidation.Attributes;
using ScottNet.Web.ViewModels.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {

        public string Password { get; set; }
        public string UserName { get; set; }
    }
}
