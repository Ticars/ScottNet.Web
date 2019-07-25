using Microsoft.Extensions.Configuration;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using ScottNet.Web.Services.AzureStorage;
using ScottNet.Web.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Services
{
    public class PhotoImportService : IPhotoImportService
    {
        private readonly IDataRepository _data;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuration;

        public PhotoImportService(IDataRepository data, IStorageService storageService, IConfiguration configuration)
        {
            _data = data;
            _storageService = storageService;
            _configuration = configuration;
        }

        public async Task UploadPhotoVersionsAsync(AppUser user, Stream photoStream, string filename, string description)
        {
            try
            {
                var group = await _data.AddImageGroup(filename, description, user);
                IEnumerable<ImageFormatSpec> formats = await _data.GetAllImageFormatsAsync();
                foreach (ImageFormatSpec format in formats)
                {
                    var modifiedImage = GetImageFile(photoStream, format);
                    if (modifiedImage != null)
                    {
                        string uploadFilePath = GetFileName(user, filename, format, group);
                        UploadBlobData uploadData = await _storageService.UploadFile(uploadFilePath, modifiedImage);
                        uploadData.Size = Convert.ToInt32(modifiedImage.Length);
                        await _data.AddImageInstanceAsync(group, format, uploadData);
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private string GetFileName(AppUser user, string filename, ImageFormatSpec format, ImageGroup group)
        {
            var extension = Path.GetExtension(filename);
            string fileNameFormat = _configuration["PhotoUpload:fileNameFormat"];
            string fileNamePreix = group.Id.ToString(fileNameFormat);
            return $"{user.Id.ToLower()}/{fileNamePreix}{format.FileNameSuffix}{extension}";
        }

        private Stream GetImageFile(Stream originalStream, ImageFormatSpec spec)
        {
            if(spec.IsOriginal())
            {
                return ImageFunctions.AutoOrient(originalStream);
            }
            else
            {
                return ImageFunctions.Shrink(originalStream, spec);
            }
        }

    }
}
