import { Component } from "@angular/core";
import { WeatherDataService, WeatherReadingModel } from "../shared/index";

@Component({
  templateUrl:'currentWeather.component.html'
})
export class CurrentWeather {
  private currentWeather: WeatherReadingModel
  constructor(private data: WeatherDataService) {

  }
  ngOnInit() {
    this.updateReading();
  }

  updateReading() {
    console.log("Updating")
    this.data.getCurrentReading().subscribe(data => {
      this.currentWeather = data;
    });
  }
  
}
