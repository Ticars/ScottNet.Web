import { IconService } from "./icon.service";

export class WeatherReadingModel {
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
  consoleTime: Date
  barometerTrendCode: number
  barometer: number
  indoorTemp: number
  indoorHumidity: number
  outdoorHumidity: number
  outdoorTemp: number
  windDirection: number
  windSpeed: number
  windSpeed10M: number
  windSpeed2M: number
  windGustSpeed10M: number
  windGustDirection10M: number
  rainRate: number
  rainStorm: number
  rainDay: number
  rainMonth: number
  rainYear: number
  rain15M: number
  rain1H: number
  rain24H: number
  dewPoint: number
  heatIndex: number
  windChill: number
  forecastRain: boolean
  forecastSnow: boolean
  forecastCloudy: boolean
  forecastSun: boolean
  forecastPartlyCloudy: boolean
  isFromMemory:boolean
  getOutdoorWeather(): ITemperatureHumidity {
    return {
      temperature: this.outdoorTemp,
      humidity: this.outdoorHumidity
    };
  }

  getIndoorWeather(): ITemperatureHumidity {
    return {
      temperature: this.indoorTemp,
      humidity: this.indoorHumidity
    };
  }
  public getCurrentWeatherIcon(): string {
    if (this.forecastSnow) {
      return IconService.snowy;
    } else if (this.forecastRain) {
      return IconService.rainy;
    } else if (this.windChill < 30) {
      return IconService.cold;
    } else if (this.heatIndex > 95) {
      return IconService.hot;
    } else if (this.forecastPartlyCloudy) {
      return IconService.partlyCloudy;
    } else if (this.forecastCloudy) {
      return IconService.cloudy;
    } else if (this.forecastSun) {
      return IconService.clear;
    } else {
      return "";
    }

  }
  getRainData(): IRain {
    return {
      rateCurrent: this.rainRate,
      total15M: this.rain15M,
      total1H: this.rain1H,
      total24H: this.rain24H,
      totalToday: this.rainDay,
      totalMonth: this.rainMonth,
      totalYear: this.rainYear
    };
  }
}

export interface ITemperatureHumidity {
  temperature: number
  humidity: number
}

export interface IRain {
  rateCurrent: number
  total15M: number
  total1H: number
  total24H: number
  totalToday: number
  totalMonth: number
  totalYear: number
}

export interface DailyWeatherForecast {
  day: Date,
  lowTemperature: number,
  highTemperature: number,
  description: string
}
