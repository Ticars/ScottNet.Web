import { Component, Input } from "@angular/core";

@Component({
  template: `
      <div class="compass">
        <div class="arrow" [ngStyle]="getArrowStyles()">
          <span class="hiddenArrow"></span>
          <span class="visibleArrow"></span>
        </div>
        <span class="speed">{{windSpeed}}<span>mph</span></span>
      </div>
`,
  styleUrls: ['./windvane.component.css'],
  selector: 'wind-vane'
})
export class WindVane {
  @Input() windSpeed: number
  @Input() windDirection: number
  
  getArrowStyles() {
    let directionString = 'rotate(' + this.windDirection + 'deg)';
    return {
      'WebkitTransform': directionString,
      'MozTransform': directionString,
      'OTransform': directionString,
      'msTransform': directionString
    }
  }
}
