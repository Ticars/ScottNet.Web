import { Component, Input } from "@angular/core";
import { CurrentWeatherService, ITemperatureHumidity } from "../shared";


@Component({
  selector: 'temp-humidty',
  template: `
    <div class='temp-hum'><temperature temperature={{humTemp?.temperature}}></temperature> / {{humTemp?.humidity}}%</div>
`,
  styles:['.temp-hum: {font-size:22px;}']
})
export class TempHumWidget
{
  @Input() public humTemp: ITemperatureHumidity
  constructor(private currentWeather: CurrentWeatherService) {
  } 
}
