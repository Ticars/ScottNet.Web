import { WeatherReadingModel, CurrentWeatherService } from "../../shared";
import { Component, Input } from "@angular/core";


@Component({
  template: `
<div class="container small">
  <div  *ngFor="let item of currentReading | keyvalue">
    <b>{{item.key}}</b>: {{item.value}}
  </div>
  <b>Updates</b>: {{currentWeatherService.updates}}
</div>
  `,
  selector: 'raw-weather'
})
export class RawWeather {
  currentReading: WeatherReadingModel
  constructor(public currentWeatherService: CurrentWeatherService) {
  }

  ngOnInit() {
    this.currentWeatherService.weatherReading.subscribe(wr => this.currentReading = wr)
  }

}
