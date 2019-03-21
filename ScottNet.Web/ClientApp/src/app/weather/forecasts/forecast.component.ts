import { WeatherDataService, DailyWeatherForecast } from "../../shared";
import { Component } from "@angular/core";

@Component({
  selector: 'forecasts',
  templateUrl: 'forecast.component.html'
})
export class Forecasts {
  maxForecasts:number = 6
  forecasts: DailyWeatherForecast[]
  constructor(private weatherService: WeatherDataService) {
  }
  ngOnInit() {
    
    this.weatherService.getDailyForecasts().subscribe(forecasts => {
      this.forecasts = forecasts;
      if (this.forecasts.length > this.maxForecasts) {
        this.forecasts = this.forecasts.slice(0, this.maxForecasts);
      }
      console.log("forecast count" + this.forecasts.length)
    }
    );
  }
}
