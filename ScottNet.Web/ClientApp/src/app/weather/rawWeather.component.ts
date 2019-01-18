import { WeatherReadingModel } from "../shared";
import { Component, Input } from "@angular/core";


@Component({
  template: `
<div class="container small"  *ngFor="let item of reading | keyvalue">
  <b>{{item.key}}</b>: {{item.value}}
</div>
  `,
  selector: 'raw-weather'
})
export class RawWeather {
  @Input() reading: WeatherReadingModel
}
