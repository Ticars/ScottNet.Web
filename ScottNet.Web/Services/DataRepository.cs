using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScottNet.Web.Data;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using System;
using System.Collections.Generic;
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

        public async Task<WeatherReading> GetMostRecentReadingAsync()
        {
            return await _ctx.WeatherReadings
                .OrderByDescending(r => r.ConsoleTime)
                .FirstOrDefaultAsync();
        }

        public async Task<WeatherReading> GetWeatherReadingAsync(int id)
        {
            return await _ctx.WeatherReadings
                .Include(r => r.BarometricTrend)
                .FirstOrDefaultAsync(wr => wr.Id == id);
        }

        public async Task<IEnumerable<WeatherReading>> GetSummaryReadings(int minuteGroups, DateTime startDate, DateTime? endTime = null)
        {
            return await _ctx
                .WeatherReadings
                .Where(wr => wr.ConsoleTime >= startDate && wr.ConsoleTime <= endTime.GetValueOrDefault(DateTime.MaxValue))
                .GroupBy(wr => new { wr.ConsoleTime.Year, wr.ConsoleTime.Month, wr.ConsoleTime.Day, minutegroup = (wr.ConsoleTime.Hour * 60 + wr.ConsoleTime.Minute) / minuteGroups })
                .Select(x => x.OrderBy(y => y.ConsoleTime).Last())
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return (await _ctx.SaveChangesAsync()) > 0;
        }

        public async Task<ImageGroup> AddImageGroup(string filename, string description, AppUser user)
        {
            var imgGroup = new ImageGroup()
            {
                OriginalFileName = filename,
                Description = description,
                UploadDate = DateTime.Now,
                UploadUser = user,
                UploadUserId = user.Id
            };
            await _ctx.AddAsync<ImageGroup>(imgGroup);
            await _ctx.SaveChangesAsync();
            return imgGroup;
        }

        public async Task<IEnumerable<ImageFormatSpec>> GetAllImageFormatsAsync()
        {
            return await _ctx
                .ImageFormatSpecs
                .OrderBy(s => s.FormatOrder)
                .ToListAsync();
        }

        public async Task<ImageInstance> AddImageInstanceAsync(ImageGroup group, ImageFormatSpec format, UploadBlobData uploadData)
        {
            var image = new ImageInstance()
            {
                CreateDate = DateTime.Now,
                ImageFormatSpec = format,
                ImageFormatSpecId = format.Id,
                ImageGroup = group,
                ImageGroupId = group.Id,
                Size = uploadData.Size,
                Url = uploadData.Url,
                SharedUrl = uploadData.SharedUrl
            };
            await _ctx.AddAsync<ImageInstance>(image);
            await _ctx.SaveChangesAsync();
            return image;
        }


    }
}
