using System.IO;
using System.Threading.Tasks;
using ScottNet.Web.Data.Entities;

namespace ScottNet.Web.Services
{
    public interface IPhotoImportService
    {
        Task UploadPhotoVersionsAsync(AppUser user, Stream photoStream, string filename, string description);
    }
}