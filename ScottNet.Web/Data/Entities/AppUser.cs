using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? GoogleId { get; set; }
        public string PictureUrl { get; set; }
        public string InitialIP { get; set; }
        [ForeignKey("UploadUserId")]
        public ICollection<ImageGroup> Images { get; set; }
        [ForeignKey("UserId")]
        public ICollection<RefreshToken> RefreshTokens { get; set; }

    }

}
