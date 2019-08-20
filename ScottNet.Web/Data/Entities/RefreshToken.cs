using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public DateTime IssueUtc { get; set; }
        [Column(TypeName = "VARCHAR(15)")]
        public string RequestingIPAddress { get; set; }
        public DateTime? ExpiresUtc { get; set; }
        [Column(TypeName = "VARCHAR(50)")]
        [Required]
        public string Token { get; set; }
        public AppUser User { get; set; }
        [Required]
        public string UserId { get; set; }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
