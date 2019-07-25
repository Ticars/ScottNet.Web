using ScottNet.Web.Data.Entities;
using ScottNet.Web.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Utilities
{
    public class ImageFunctions
    {
        private static IImageEncoder GetEncoder(IImageFormat format, ImageFormatSpec imageFormat)
        {
            switch (format.Name)
            {
                case "PNG":
                    var pngEnc = new PngEncoder();
                    pngEnc.CompressionLevel = imageFormat.PngCompression ?? pngEnc.CompressionLevel;
                    return pngEnc;
                case "JPEG":
                    var jpgEnc = new JpegEncoder();
                    jpgEnc.Quality = imageFormat.JpegQuality ?? jpgEnc.Quality;
                    return jpgEnc;
                case "GIF":
                    return new GifEncoder();
                case "BMP":
                    return new BmpEncoder();
                default:
                    return null;
            }
        }


        public static Stream AutoOrient(Stream input)
        {
            try
            {
                if (input != null)
                {
                    input.Position = 0;
                    using (Image<Rgba32> image = Image.Load(input, out IImageFormat format))
                    {
                        var ms = new MemoryStream();
                        image.Mutate(x => { x.AutoOrient(); });
                        image.Save(ms, format);
                        return ms;
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private static Size GetShrinkSize(int imageHeight, int imageWidth, int maxWidth)
        {
            var widthDivisor = imageWidth / (float)maxWidth;
            if (widthDivisor >= 1)
            {
                return new Size(maxWidth, Convert.ToInt32(Math.Round(imageHeight / widthDivisor)));
            }
            else
            {
                return new Size(0, 0);
            }
        }

        public static Stream Shrink(Stream input, ImageFormatSpec imageFormat)
        {
            if (input != null && imageFormat.MaxWidth.HasValue)
            {
                input.Position = 0;
                try
                {
                    using (Image<Rgba32> image = Image.Load(input, out IImageFormat format))
                    {
                        image.Mutate(x => x.AutoOrient());
                        IImageEncoder encoder = GetEncoder(format, imageFormat);

                        var newSize = GetShrinkSize(image.Height, image.Width, imageFormat.MaxWidth.Value);
                        if (newSize.Width > 0 && newSize.Height > 0)
                        {

                            image.Mutate(x => x.Resize(newSize));
                            var ms = new MemoryStream();

                            image.Save(ms, encoder);
                            return ms;

                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Unable to resize image.  Please check image format.", ex);
                }
            }
            return null;
        }
    }
}
