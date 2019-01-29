using Microsoft.AspNetCore.Hosting;
using ScottNet.Web.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScottNet.Web.Data
{
    public class ScottDbSeeder
    {
        private readonly ScottDbContext _ctx;
        private readonly IHostingEnvironment _hosting;

        public ScottDbSeeder(ScottDbContext ctx, IHostingEnvironment hosting)
        {
            _ctx = ctx;
            _hosting = hosting;
        }

        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();
            
            
            await AddBarometericTrendAsync(1, -60, "Falling Rapidly");
            await AddBarometericTrendAsync(2, -20, "Falling Slowly");
            await AddBarometericTrendAsync(3, 0, "Steady");
            await AddBarometericTrendAsync(4, 20, "Rising Slowly");
            await AddBarometericTrendAsync(5, 60, "Rising Rapidly");
            
            await _ctx.SaveChangesAsync();
        }

        private async Task AddBarometericTrendAsync(short id, short code, string title)
        {
            if (!_ctx.BarometricTrends.Any(bt => bt.Id == id || bt.Code == code))
            {
                var trend = new BarometricTrend()
                {
                    Id = id,
                    Code = code,
                    Title = title
                };
                await _ctx.BarometricTrends.AddAsync(trend);
            }
            
        }
    }
}
