using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ScottNet.ImageLib
{
    public class EncoderFormat
    {
        public int MaxWidth { get; set; }
        [Range(1, 100)]
        public int JpegQuality { get;set; }

        [Range(1, 9)]
        public int PngCompression { get; set; }
    }
}
