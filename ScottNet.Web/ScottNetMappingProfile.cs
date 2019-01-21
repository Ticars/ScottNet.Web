using AutoMapper;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web
{
    public class ScottNetMappingProfile : Profile
    {
        public ScottNetMappingProfile()
        {
            CreateMap<WeatherReadingEntity, WeatherReadingViewModel>()
               .ForMember(o => o.ForecastCloudy, ex => ex.MapFrom(o => o.ForecastCloudyIcon))
               .ForMember(o => o.ForecastPartlyCloudy, ex => ex.MapFrom(o => o.ForecastPartlyCloudyIcon))
               .ForMember(o => o.ForecastRain, ex => ex.MapFrom(o => o.ForecastRainIcon))
               .ForMember(o => o.ForecastSnow, ex => ex.MapFrom(o => o.ForecastSnowIcon))
               .ForMember(o => o.ForecastSun, ex => ex.MapFrom(o => o.ForecastSunIcon))
               .ReverseMap();

        }
    }
}
