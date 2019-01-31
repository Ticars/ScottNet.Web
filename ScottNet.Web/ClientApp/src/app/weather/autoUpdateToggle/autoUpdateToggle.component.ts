import { Component } from "@angular/core";
import { CurrentWeatherService } from "../../shared";

@Component({
  template: `
  <toggle text="Auto Update" [checked]="curWeatherSvc.isAutoRefresh()" (changed)="toggled($event)" ></toggle>
`,
  selector: "auto-update"
})
export class AutoUpdateToggle {
  constructor(public curWeatherSvc: CurrentWeatherService) {
  }

  ngOnInit() {
    this.curWeatherSvc.dataRetrieved.subscribe(updates => {
      if (updates % 60 === 0 && this.curWeatherSvc.isAutoRefresh()) {
        this.curWeatherSvc.setAutoRefresh(false);
        }
      }
    
    );
  }

  toggled(event) {
    this.curWeatherSvc.setAutoRefresh(event)
  }
}
