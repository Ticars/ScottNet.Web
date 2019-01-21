import { Component } from "@angular/core";
import { CurrentWeatherService } from "../shared";

@Component({
  template: `
  <toggle text="Auto Update" [checked]="curWeatherSvc.isAutoRefresh()" (changed)="toggled($event)" ></toggle>
`,
  selector: "auto-update"
})
export class AutoUpdateToggle {
  constructor(private curWeatherSvc: CurrentWeatherService) {

  }

  toggled(event) {
    this.curWeatherSvc.setAutoRefresh(event)
  }
}
