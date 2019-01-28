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
  getRainData(): IRain {
    console.log("getRain")
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
