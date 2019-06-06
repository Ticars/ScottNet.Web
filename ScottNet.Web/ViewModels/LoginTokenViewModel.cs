using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class LoginTokenViewModel
    {
        public string IdentityId { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public int ExpiresIn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; internal set; }
    }
}
