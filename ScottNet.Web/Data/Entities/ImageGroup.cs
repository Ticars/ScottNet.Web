using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class ImageGroup
    {
        public int Id { get; set; }
       
        [Column(TypeName = "VARCHAR(100)")]
        public string OriginalFileName { get; set; }
        [Column(TypeName = "VARCHAR(200)")]
        public string PathToOriginal { get; set; }
        [Column(TypeName = "VARCHAR(500)")]
        public string Description { get; set; }
        public ICollection<ImageInstance> ImageInstances { get; set; }

        public string UploadUserId { get; set; }
        public AppUser UploadUser { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
