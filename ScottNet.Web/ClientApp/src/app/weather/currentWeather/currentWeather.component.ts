import { Component } from "@angular/core";
import { WeatherDataService, WeatherReadingModel, CurrentWeatherService } from "../../shared/index";

@Component({
  templateUrl:'currentWeather.component.html'
})
export class CurrentWeather {
  public showChart = false;
  currentReading: WeatherReadingModel
  constructor(public currentWeatherService: CurrentWeatherService) {
  }
  ngOnInit() {
    this.currentWeatherService.weatherReading.subscribe(wr => {
      this.currentReading = wr
    });
  }

  setShowChart(show: boolean) {
    this.showChart = show;
  }
  
  
  
}
