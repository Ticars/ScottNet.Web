using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using ScottNet.Web.Data.Entities;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.AzureStorage
{
    public class StorageService : IStorageService
    {
        public const string WEATHER_TABLE = "Weather";
        private CloudStorageAccount _storageAccount;
        private CloudTableClient _tableClient;
        public StorageService(IConfiguration config)
        {
            _storageAccount = CloudStorageAccount.Parse(config.GetConnectionString("StorageKey"));
            _tableClient = _storageAccount.CreateCloudTableClient();
        }

        public async Task AddUpdateCurrentWeather(WeatherReadingStorageEntity weather)
        {
            CloudTable table = _tableClient.GetTableReference(WEATHER_TABLE);
            TableOperation insertOrReplaceOperation = TableOperation.InsertOrReplace(weather);

            var result = await table.ExecuteAsync(insertOrReplaceOperation);
        }


        public async Task<WeatherReadingStorageEntity> GetCurrentWeatherAsync()
        {
            CloudTable table = _tableClient.GetTableReference(WEATHER_TABLE);

            // Create a retrieve operation that takes a customer entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<WeatherReadingStorageEntity>(WeatherReadingStorageEntity.PARTITION_KEY, WeatherReadingStorageEntity.ROW_KEY);

            TableResult retrievedResult = await table.ExecuteAsync(retrieveOperation);
            return (WeatherReadingStorageEntity)retrievedResult.Result;
        }
    }
}
