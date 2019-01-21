import { Component } from "@angular/core";
import { WeatherDataService, WeatherReadingModel, CurrentWeatherService } from "../shared/index";

@Component({
  templateUrl:'currentWeather.component.html'
})
export class CurrentWeather {
  constructor(public currentWeatherService: CurrentWeatherService) {
  }
  
  updateReading() {
    this.currentWeatherService.updateReading();
  }
  
}
