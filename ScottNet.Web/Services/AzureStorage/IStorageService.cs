using ScottNet.Web.Data.Entities;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.AzureStorage
{
    public interface IStorageService
    {
        Task<WeatherReadingEntity> GetCurrentWeatherAsync();
    }
}
