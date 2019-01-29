using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Data;
using ScottNet.Web.Data.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public class DataRepository : IDataRepository
    {
        private readonly ScottDbContext _ctx;
        private readonly ILogger<DataRepository> _logger;

        public DataRepository(ScottDbContext ctx, ILogger<DataRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public async Task AddEntityAsync(object model)
        {
            await _ctx.AddAsync(model);
        }

        public BarometricTrend GetBarometricTrendByCode(short code)
        {
            return GetBarometricTrendByCodeAsync(code).Result;
        }

        public async Task<BarometricTrend> GetBarometricTrendByCodeAsync(short code)
        {
            return await _ctx.BarometricTrends.FirstOrDefaultAsync(bt => bt.Code == code);
        }

        public async Task<WeatherReading> GetWeatherReadingAsync(int id)
        {
            return await _ctx.WeatherReadings
                .Include(r => r.BarometricTrend)
                .FirstOrDefaultAsync(wr => wr.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return (await _ctx.SaveChangesAsync()) > 0;
        }
    }
}
