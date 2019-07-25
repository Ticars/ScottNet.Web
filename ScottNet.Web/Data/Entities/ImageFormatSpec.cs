using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class ImageFormatSpec
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR(50)")]
        public string Name { get; set; }
        [Column(TypeName = "VARCHAR(10)")]
        public string FileNameSuffix { get; set; }
        public int FormatOrder { get; set; }
        public int? MaxWidth { get; set; }
        [Range(1, 100)]
        public int? JpegQuality { get; set; }
        [Range(1, 9)]
        public int? PngCompression { get; set; }

        internal bool IsOriginal()
        {
            return !MaxWidth.HasValue;
        }
    }
}
