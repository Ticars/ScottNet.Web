import { WeatherReadingModel, CurrentWeatherService } from "../shared";
import { Component, Input } from "@angular/core";


@Component({
  template: `
<div class="container small">
  <div  *ngFor="let item of currentWeatherService?.currentReading | keyvalue">
    <b>{{item.key}}</b>: {{item.value}}
  </div>
  <b>Updates</b>: {{currentWeatherService?.updates}}
</div>
  `,
  selector: 'raw-weather'
})
export class RawWeather {
  constructor(private currentWeatherService: CurrentWeatherService) {
  }
}
