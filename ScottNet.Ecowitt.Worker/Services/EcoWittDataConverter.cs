using ScottNet.Ecowitt.Worker.Models;
using ScottNet.Ecowitt.Worker.Models.Ecowitt;
using ScottNet.Ecowitt.Worker.Utilities;

namespace ScottNet.Ecowitt.Worker.Services
{
    public class EcoWittDataConverter
    {
        // EcoWitt common item IDs (from Documentation-Samples/EcoWittCommonItems.txt)
        private const string ITEM_INTEMP = "0x01"; // Indoor Temperature
        private const string ITEM_OUTTEMP = "0x02"; // Outdoor Temperature
        private const string ITEM_FEELSLIKE = "3"; // Feels Like
        private const string ITEM_DEWPOINT = "0x03"; // Dew point
        private const string ITEM_WINDCHILL = "0x04"; // Wind chill
        private const string ITEM_HEATINDEX = "0x05"; // Heat index
        private const string ITEM_INHUMI = "0x06"; // Indoor Humidity
        private const string ITEM_OUTHUMI = "0x07"; // Outdoor Humidity
        private const string ITEM_ABSBARO = "0x08"; // Absolute Barometric
        private const string ITEM_RELBARO = "0x09"; // Relative Barometric
        private const string ITEM_WINDDIRECTION = "0x0A"; // Wind Direction
        private const string ITEM_WINDSPEED = "0x0B"; // Wind Speed
        private const string ITEM_GUSTSPEED = "0x0C"; // Gust Speed
        private const string ITEM_RAINEVENT = "0x0D"; // Rain Event
        private const string ITEM_RAINRATE = "0x0E"; // Rain Rate
        private const string ITEM_RAIN_GAIN = "0x0F"; // Rain gain
        private const string ITEM_RAINDAY = "0x10"; // Rain Day
        private const string ITEM_RAINWEEK = "0x11"; // Rain Week
        private const string ITEM_RAINMONTH = "0x12"; // Rain Month
        private const string ITEM_RAINYEAR = "0x13"; // Rain Year
        private const string ITEM_RAINTOTALS = "0x14"; // Rain Totals
        private const string ITEM_LIGHT = "0x15"; // Light (lux)
        private const string ITEM_UV = "0x16"; // UV (uW/m2)
        private const string ITEM_UVI = "0x17"; // UVI index
        private const string ITEM_TIME = "0x18"; // Date and time
        private const string ITEM_DAYLWINDMAX = "0x19"; // Day max wind
        private const string ITEM_GUSTDIRECTION = "0x6D"; // gust direction (guess)

        private const short FEELS_LIKE_SWITCH_OVER = 50; //When to switch from wind chill to heat index
        // use temp * 10
        public ScottNetUpload ConvertEcowittData(EcoWittLiveData data)
        {
            
           // var rainData = data.R
            var uploadData = new ScottNetUpload();
            uploadData.ConsoleTime = DateTime.Now; 
            if(data.Wh25 != null && data.Wh25.Count > 0)
            {
                uploadData.IndoorTemp = GetShortValue(data.Wh25[0].InTemp, 1);
                uploadData.IndoorHumidity = Convert.ToByte(data.Wh25[0].InHumi.ExtractDecimalValue());
                uploadData.Barometer = GetShortValue(data.Wh25[0].Rel.ExtractDecimalValue(), 3);
                
            }
            if (data.CommonList != null)
            {
                uploadData.OutdoorTemp = GetShortValue(GetCommonItem(data, ITEM_OUTTEMP)?.Val, 1);
                uploadData.OutdoorHumidity = Convert.ToByte(GetCommonItem(data, ITEM_OUTHUMI)?.Val.ExtractDecimalValue());
                uploadData.DewPoint = GetShortValue(GetCommonItem(data, ITEM_DEWPOINT)?.Val, 0);
                uploadData.WindDirection = GetShortValue(GetCommonItem(data, ITEM_WINDDIRECTION)?.Val, 0);
                uploadData.HeatIndex = GetCommonItem(data, ITEM_HEATINDEX) == null ? null : GetShortValue(GetCommonItem(data, ITEM_HEATINDEX)?.Val, 0);
                uploadData.WindChill = GetCommonItem(data, ITEM_WINDCHILL) == null ? null : GetShortValue(GetCommonItem(data, ITEM_WINDCHILL)?.Val, 0);
                uploadData.WindGustSpeed10M = GetUShortValue(GetCommonItem(data, ITEM_GUSTSPEED)?.Val);
                uploadData.WindGustDirection10M = GetShortValue(GetCommonItem(data, ITEM_GUSTDIRECTION)?.Val);
                uploadData.WindSpeed = GetShortValue(GetCommonItem(data, ITEM_WINDSPEED)?.Val);
                uploadData.WindDirection = GetShortValue(GetCommonItem(data, ITEM_WINDDIRECTION)?.Val, 0);
            }


            //Adjust WindChill and HeatIndex
            var actualOutdoorTemp = GetShortValue(GetCommonItem(data, ITEM_OUTTEMP)?.Val, 0);
            var feelsLikeValue = actualOutdoorTemp;
            var feelsLike = GetCommonItem(data, ITEM_WINDCHILL);
            if (feelsLike != null)
            {
                feelsLikeValue = GetShortValue(GetCommonItem(data, ITEM_FEELSLIKE)?.Val, 0);
            }
            uploadData.HeatIndex = uploadData.HeatIndex.GetValueOrDefault(actualOutdoorTemp > FEELS_LIKE_SWITCH_OVER ? feelsLikeValue : actualOutdoorTemp);
            uploadData.WindChill = uploadData.WindChill.GetValueOrDefault(actualOutdoorTemp <= FEELS_LIKE_SWITCH_OVER ? feelsLikeValue : actualOutdoorTemp);
            
            uploadData.RainStorm =  GetUShortValue(GetRainItem(data, ITEM_RAINEVENT)?.Val, 2);
            uploadData.RainRate = GetUShortValue(GetRainItem(data, ITEM_RAINRATE)?.Val, 2);
            uploadData.RainDay = GetUShortValue(GetRainItem(data, ITEM_RAINDAY)?.Val, 2);
            uploadData.RainMonth = GetUShortValue(GetRainItem(data, ITEM_RAINMONTH)?.Val, 2);
            uploadData.RainYear = GetUShortValue(GetRainItem(data, ITEM_RAINYEAR)?.Val, 2);
            

            return uploadData;
        }

        private CommonListItem? GetCommonItem(EcoWittLiveData ecoWittLiveData, string itemId)
        {
            return ecoWittLiveData.CommonList?.FirstOrDefault(li => li.Id == itemId);
        }
        private RainItem? GetRainItem(EcoWittLiveData ecoWittLiveData, string itemId)
        {
            return ecoWittLiveData.Rain?.FirstOrDefault(li => li.Id == itemId);
        }

        private short GetShortValue(string? value, short power = 0)
        {
            return String.IsNullOrEmpty(value) ? (short)0 : (short)(value.ExtractDecimalValue() * (decimal)(Math.Pow(10, power)));
        }

        private ushort GetUShortValue(string? value, short power = 0)
        {
            return String.IsNullOrEmpty(value) ? (ushort)0 : (ushort)(value.ExtractDecimalValue() * (decimal)(Math.Pow(10, power)));
        }

        private short GetShortValue(decimal? value, short power = 0)
        {
            return value.HasValue ? (short)(value * (decimal)(Math.Pow(10, power))) : (short)0;
        }

    }
}
