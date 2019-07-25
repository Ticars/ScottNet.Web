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
using System.IO;
using System.Text.RegularExpressions;

namespace ScottNet.ImageLib
{
    public class ShrinkImage
    {

        private static IImageEncoder GetEncoder(IImageFormat format, EncoderFormat encoderFormat)
        {
            switch (format.Name)
            {
                case "PNG":
                    return new PngEncoder() { CompressionLevel = encoderFormat.PngCompression };
                case "JPEG":
                    return new JpegEncoder() { Quality = encoderFormat.JpegQuality };
                case "GIF":
                    return new GifEncoder();
                case "BMP":
                    return new BmpEncoder();
                default:
                    return null;
            }
        }


        public static Byte[] AutoOrient(Stream input)
        {
            try
            {
                if (input != null)
                {
                    using (var ms = new MemoryStream())
                    using (Image<Rgba32> image = Image.Load(input, out IImageFormat format))
                    {
                        image.Mutate(x => { x.AutoOrient(); });
                        image.Save(ms, format);
                        return ms.ToArray();
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
            if(widthDivisor >= 1 )
            {
                return new Size(maxWidth, Convert.ToInt32(Math.Round(imageHeight / widthDivisor)));
            }
            else
            {
                return new Size(0,0);
            }
        }

        public static byte[] Shrink(Stream input, EncoderFormat encoderFormat)
        {
            if (input != null)
            {
                try
                {

                    using (Image<Rgba32> image = Image.Load(input, out IImageFormat format))
                    {
                        image.Mutate(x => x.AutoOrient());
                        IImageEncoder encoder = GetEncoder(format, encoderFormat);

                        var newSize = GetShrinkSize(image.Height, image.Width, encoderFormat.MaxWidth);
                        if (newSize.Width > 0 && newSize.Height > 0)
                        {
                            
                            image.Mutate(x => x.Resize(newSize));
                            using (var ms = new MemoryStream())
                            {
                                image.Save(ms, encoder);
                                return ms.ToArray(); ;
                            }
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
