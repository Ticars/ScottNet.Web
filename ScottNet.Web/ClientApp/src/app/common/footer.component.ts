import { Component } from "@angular/core";
import { CurrentWeatherService, WeatherReadingModel } from "../shared";

@Component({
  templateUrl: './footer.component.html',
  selector: 'snfooter',
  styleUrls: ['./footer.component.css']

})
export class SNFooter {
  toggleChecked: boolean
  currentReading: WeatherReadingModel
  constructor(public curWeatherSvc: CurrentWeatherService) {

  }
  ngOnInit() {
    this.toggleChecked = true
    this.curWeatherSvc.weatherReading.subscribe(cw => {
      this.currentReading = cw
    })
  }

  toggled(event:any): void {
    console.log(event)
  }
}
