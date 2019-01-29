using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.Data.Entities
{
    public class BarometricTrend
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short Id { get; set; }
        public short Code { get; set; }
        [Column(TypeName = "VARCHAR(50)")]
        public string Title { get; set; }

        public BarometricTrend() { }
    }
}
