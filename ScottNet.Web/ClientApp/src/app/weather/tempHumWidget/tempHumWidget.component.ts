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
<span *ngIf="windChill && windChill < 35" class="small red" >Wind Chill: {{windChill}} </span>
<span *ngIf="heatIndex && heatIndex > 82" class="small red">Heat Index: {{heatIndex}} </span>
</div>
`,
  styles: [`
    .red { color: red; }
    .blue { color: blue; }
    .temp-hum {font-size:22px;}
    .forecast-icon { width:80px;}
`]

})
export class TempHumWidget
{
  @Input() public humTemp: ITemperatureHumidity
  @Input() public windChill: number
  @Input() public heatIndex: number
  @Input() public icon: string

  constructor(private currentWeather: CurrentWeatherService) {
  } 
}
