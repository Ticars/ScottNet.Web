using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using System.IO;
using System.Threading.Tasks;

namespace ScottNet.Web.Services.AzureStorage
{
    public interface IStorageService
    {
        Task<UploadBlobData> UploadFile(string uploadPath, Stream photoStream);
        
    }
}
