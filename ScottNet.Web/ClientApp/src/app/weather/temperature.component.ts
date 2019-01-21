import { Component, Input } from "@angular/core";

@Component({
  template: `
    <span class="temperature ml-4" [ngStyle]="{'color':getColor()}">{{temperature| number:'1.0-0'}}&deg;F</span>
`,
  selector: 'temperature'
})
export class Temperature {
  @Input() temperature: number
  getColor(): string {
    if (this.temperature > 85) {
      return "#FF0000"
    } else if (this.temperature < 35) {
      return "#0000FF";
    } else {
      return "#00AF00";
    }
  }
}
