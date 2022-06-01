using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class ImageInstanceViewModel
    {
        public string Url { get; set; }
        public int FileSize { get; set; }
        public string FormatName { get; set; }
        public int FormatOrder { get; set; }
    }
}
