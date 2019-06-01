using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScottNet.Web.Data.Entities;

namespace ScottNet.Web.Data
{
    public class ScottDbContext : IdentityDbContext<AppUser>
    {
        public ScottDbContext(DbContextOptions<ScottDbContext> options) : base(options)
        { }

        public DbSet<WeatherReading> WeatherReadings { get; set; }
        public DbSet<BarometricTrend> BarometricTrends { get; set; }
    }
}
