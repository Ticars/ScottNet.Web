import { Component } from "@angular/core";
import { CurrentWeatherService } from "../shared";

@Component({
  templateUrl: './footer.component.html',
  selector: 'snfooter',
  styleUrls: ['./footer.component.css']

})
export class SNFooter {
  toggleChecked: boolean
  constructor(public curWeatherSvc: CurrentWeatherService) {

  }
  ngOnInit() {
    this.toggleChecked=true
  }

  toggled(event:any): void {
    console.log(event)
  }
}
