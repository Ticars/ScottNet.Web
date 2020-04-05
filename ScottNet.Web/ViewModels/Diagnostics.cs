using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.ViewModels
{
    public class Diagnostics
    {
        public string AssemblyName { get; set; }
        public string AssemblyLocation { get; set; }
        public string Version { get; set; }
        public DateTime? CompileDate {get;set;}

    }
}
