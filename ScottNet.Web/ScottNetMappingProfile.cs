using AutoMapper;
using ScottNet.Web.Data.Entities;
using ScottNet.Web.Services;
using ScottNet.Web.ViewModels;
using System;

namespace ScottNet.Web
{
    public class ScottNetMappingProfile : Profile
    {
        public ScottNetMappingProfile()
        {

            CreateMap<WeatherReading, WeatherReadingViewModel>()
             .ForMember(o => o.BarometerTrendCode, ex => ex.MapFrom(o => o.BarometricTrend.Code))
             .ForMember(o=>o.Rain15M, ex => ex.MapFrom(o=> o.Rain15M))
             .ForMember(o => o.IsFromMemory, ex => ex.NullSubstitute(false))
             .ReverseMap();

            CreateMap<ConsoleReadingViewModel, WeatherReadingViewModel>()
                .ForMember(se => se.Barometer, vm => vm.MapFrom(vmm => vmm.Barometer / 1000D))
                .ForMember(se => se.IndoorTemp, vm => vm.MapFrom(vmm => vmm.IndoorTemp / 10D))
                .ForMember(se => se.OutdoorTemp, vm => vm.MapFrom(vmm => vmm.OutdoorTemp / 10D))
                .ForMember(se => se.WindSpeed10M, vm => vm.MapFrom(vmm => vmm.WindSpeed10M / 10D))
                .ForMember(se => se.WindSpeed2M, vm => vm.MapFrom(vmm => vmm.WindSpeed2M / 10D))
                .ForMember(se => se.RainRate, vm => vm.MapFrom(vmm => vmm.RainRate / 100D))
                .ForMember(se => se.RainStorm, vm => vm.MapFrom(vmm => vmm.RainStorm / 100D))
                .ForMember(se => se.RainDay, vm => vm.MapFrom(vmm => vmm.RainDay / 100D))
                .ForMember(se => se.RainMonth, vm => vm.MapFrom(vmm => vmm.RainMonth / 100D))
                .ForMember(se => se.RainYear, vm => vm.MapFrom(vmm => vmm.RainYear / 100D))
                .ForMember(se => se.Rain24H, vm => vm.MapFrom(vmm => vmm.Rain24Hour / 100D))
                .ForMember(se => se.Rain1H, vm => vm.MapFrom(vmm => vmm.Rain1Hour / 100D))
                .ForMember(se => se.Rain15M, vm => vm.MapFrom(vmm => vmm.Rain15Minutes / 100))
                .ForMember(se => se.ForecastCloudy, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x02) != 0))
                .ForMember(se => se.ForecastPartlyCloudy, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x04) != 0))
                .ForMember(se => se.ForecastSun, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x08) != 0))
                .ForMember(se => se.ForecastSnow, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x10) != 0))
                .ForMember(se=>se.IsFromMemory, vm=>vm.NullSubstitute(false));


            CreateMap<ConsoleReadingViewModel, WeatherReading>()
                .ForMember(se => se.Barometer, vm => vm.MapFrom(vmm => vmm.Barometer / 1000f))
                .ForMember(se => se.IndoorTemp, vm => vm.MapFrom(vmm => vmm.IndoorTemp / 10f))
                .ForMember(se => se.OutdoorTemp, vm => vm.MapFrom(vmm => vmm.OutdoorTemp / 10f))
                .ForMember(se => se.WindSpeed10M, vm => vm.MapFrom(vmm => vmm.WindSpeed10M / 10f))
                .ForMember(se => se.WindSpeed2M, vm => vm.MapFrom(vmm => vmm.WindSpeed2M / 10f))
                .ForMember(se => se.RainRate, vm => vm.MapFrom(vmm => vmm.RainRate / 100f))
                .ForMember(se => se.RainStorm, vm => vm.MapFrom(vmm => vmm.RainStorm / 100f))
                .ForMember(se => se.RainDay, vm => vm.MapFrom(vmm => vmm.RainDay / 100f))
                .ForMember(se => se.RainMonth, vm => vm.MapFrom(vmm => vmm.RainMonth / 100f))
                .ForMember(se => se.RainYear, vm => vm.MapFrom(vmm => vmm.RainYear / 100f))
                .ForMember(se => se.Rain24H, vm => vm.MapFrom(vmm => vmm.Rain24Hour / 100f))
                .ForMember(se => se.Rain1H, vm => vm.MapFrom(vmm => vmm.Rain1Hour / 100f))
                .ForMember(se => se.Rain15M, vm=> vm.MapFrom(vmm=> vmm.Rain15Minutes / 100f))
                .ForMember(se => se.ForecastRainIcon, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x01) != 0))
                .ForMember(se => se.ForecastCloudyIcon, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x02) != 0))
                .ForMember(se => se.ForecastPartlyCloudyIcon, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x04) != 0))
                .ForMember(se => se.ForecastSunIcon, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x08) != 0))
                .ForMember(se => se.ForecastSnowIcon, vm => vm.MapFrom(vmm => (vmm.ForecastIconCode & 0x10) != 0));
                
        }
    }
}
