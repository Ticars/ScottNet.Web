using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class ImageInstance
    {
        public int Id { get; set; }
        public ImageFormatSpec ImageFormatSpec { get; set; }
        public int ImageFormatSpecId { get; set; }
        public ImageGroup ImageGroup { get; set; }
        public int ImageGroupId { get; set; }
        public int Size { get; set; }
        [Column(TypeName = "VARCHAR(300)")]
        public string Url { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
