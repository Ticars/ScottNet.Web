using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public interface IDataRepository
    {
        Task<BarometricTrend> GetBarometricTrendByCodeAsync(short code);
        Task<WeatherReading> GetWeatherReadingAsync(int id);
        Task<IEnumerable<WeatherReading>> GetHourlyReadings(DateTime startDate, DateTime? endTime = null);
        Task<WeatherReading> GetMostRecentReadingAsync();
        Task AddEntityAsync(object model);
        Task<ImageGroup> AddImageGroup(string filename, string description, AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<ImageFormatSpec>> GetAllImageFormatsAsync();
        Task<ImageInstance> AddImageInstanceAsync(ImageGroup group, ImageFormatSpec format, UploadBlobData uploadData);
    }
}
