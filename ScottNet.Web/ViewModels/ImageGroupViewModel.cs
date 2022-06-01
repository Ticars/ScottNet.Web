using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class ImageGroupViewModel
    {
        public string FileName { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; }
        public string UploadUser { get; set; }
        public IEnumerable<ImageInstanceViewModel> Instances { get; set; }
    }
}
