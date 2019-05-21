
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public class Office365EmailService : IEmailService
    {
        private readonly ILogger<Office365EmailService> _logger;
        private readonly IConfiguration _configuration;

        public Office365EmailService(ILogger<Office365EmailService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public void SendHtmlMessage(string to, string subject, string htmlMessage)
        {

            String userName = _configuration["EmailSettings:uid"];
            String password = _configuration["EmailSettings:pwd"];

            MailMessage msg = new MailMessage(userName, to);
            msg.IsBodyHtml = true;
            msg.Subject = subject;
            msg.Body = htmlMessage;
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Credentials = new System.Net.NetworkCredential(userName, password);
            smtpClient.Host = "smtp.office365.com";
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            
            smtpClient.Send(msg);
        }
    }
}
