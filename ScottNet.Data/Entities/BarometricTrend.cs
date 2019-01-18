using System.ComponentModel.DataAnnotations;

namespace ScottNet.Data.Entities
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