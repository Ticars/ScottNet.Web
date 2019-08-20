using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class ConfirmEmailViewModel
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
