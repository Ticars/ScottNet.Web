using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Table;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.AzureStorage
{
    public class StorageService : IStorageService
    {
        private CloudStorageAccount _storageAccount;
        private CloudBlobClient _blobClient;
        private readonly IConfiguration _config;

        public StorageService(IConfiguration config)
        {
            _storageAccount = CloudStorageAccount.Parse(config.GetConnectionString("StorageKey"));
            _blobClient = _storageAccount.CreateCloudBlobClient();
            _config = config;
        }

        private async Task<CloudBlobContainer> GetBlockContainer()
        {
            var blobContainer = _blobClient.GetContainerReference(_config["PhotoUpload:storageContainer"].ToLower());
            await blobContainer.CreateIfNotExistsAsync();
            return blobContainer;
        }

        public string GetSharedUrl(CloudBlockBlob blob)
        {
            var storedPolicy = new SharedAccessBlobPolicy()
            {
                Permissions = SharedAccessBlobPermissions.Read |
                  SharedAccessBlobPermissions.List
            };
            return blob.GetSharedAccessSignature(storedPolicy);
        }


        public async Task<UploadBlobData> UploadFile(string uploadPath, Stream photoStream)
        {
            try
            {
                photoStream.Position = 0;
                CloudBlobContainer container = await GetBlockContainer();
                CloudBlockBlob blob = container.GetBlockBlobReference(uploadPath);
                await blob.UploadFromStreamAsync(photoStream);
                var uploadData = new UploadBlobData()
                {
                    Url = blob.Uri.ToString(),
                    SharedUrl = GetSharedUrl(blob)
                };
                return uploadData;
          }
            catch(Exception ex)
            {
                throw ex;
            }
        }

     
    }
}
