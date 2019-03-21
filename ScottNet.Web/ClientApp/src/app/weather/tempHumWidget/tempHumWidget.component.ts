import { Component, Input } from "@angular/core";
import { CurrentWeatherService, ITemperatureHumidity } from "../../shared";


@Component({
  selector: 'temp-humidty',
  template: `
<div style='width:100%'>
    <div class='temp-hum'>
<temperature [temperature]="humTemp?.temperature"></temperature>  / {{humTemp?.humidity}}%
<img class="forecast-icon float-right" *ngIf="icon?.length>0" [src]="icon" />
</div>

</div>
`,
  styles: [`
    .temp-hum {font-size:22px;}
    .forecast-icon { width:80px;}
`]

})
export class TempHumWidget
{
  @Input() public humTemp: ITemperatureHumidity
  @Input() public icon: string

  constructor(private currentWeather: CurrentWeatherService) {
  } 
}
