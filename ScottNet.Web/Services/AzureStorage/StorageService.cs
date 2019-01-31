using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using ScottNet.Web.Data.Entities;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.AzureStorage
{
    public class StorageService : IStorageService
    {
        private CloudStorageAccount _storageAccount;

        public StorageService(IConfiguration config)
        {
            _storageAccount = CloudStorageAccount.Parse(config.GetConnectionString("StorageKey"));
           
        }

     
    }
}
