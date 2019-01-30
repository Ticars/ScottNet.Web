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

     
    }
}
