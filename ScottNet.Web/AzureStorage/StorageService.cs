using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.AzureStorage
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
       
        
        public async Task<WeatherReadingEntity> GetCurrentWeatherAsync()
        {
            CloudTable table = _tableClient.GetTableReference(WEATHER_TABLE);

            // Create a retrieve operation that takes a customer entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<WeatherReadingEntity>(WeatherReadingEntity.PARTITION_KEY, WeatherReadingEntity.ROW_KEY);

            TableResult retrievedResult = await table.ExecuteAsync(retrieveOperation);
            return (WeatherReadingEntity)retrievedResult.Result;
        }
    }
}
