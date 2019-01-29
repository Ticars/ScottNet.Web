using ScottNet.Web.Data.Entities;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public interface IDataRepository
    {
        Task<BarometricTrend> GetBarometricTrendByCodeAsync(short code);
        Task<WeatherReading> GetWeatherReadingAsync(int id);
        Task<WeatherReading> GetMostRecentReading();



        Task AddEntityAsync(object model);

        Task<bool> SaveAllAsync();
        
    }
}
