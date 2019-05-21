using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public interface IEmailService
    {
        void SendHtmlMessage(string to, string subject, string htmlMessage);
    }
}
