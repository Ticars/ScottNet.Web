using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class BarometricTrend
    {
        [Key]
        public short BarometricTrendId { get; set; }
        public short BarometricTrendCode { get; set; }
        public string Title { get; set; }

        public BarometricTrend() { }
    }
}
