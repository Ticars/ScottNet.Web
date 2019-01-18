using Microsoft.EntityFrameworkCore;
using ScottNet.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ScottNet.Data
{
    public class ScottDbContext : DbContext
    {
        public ScottDbContext(DbContextOptions<ScottDbContext> options) : base(options)
        { }

        public DbSet<WeatherReading> WeatherReadings { get; set; }
    }
}
