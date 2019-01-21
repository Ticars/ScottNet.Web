using Microsoft.AspNetCore.Hosting;
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

        public Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();
            return Task.CompletedTask;

        }
    }
}
