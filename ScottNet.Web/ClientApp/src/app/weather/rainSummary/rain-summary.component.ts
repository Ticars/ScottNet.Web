import { Component, Input } from "@angular/core";
import { IRain } from "../../shared";

@Component({
  template: `
    <div><span>Current Rate: </span><span>{{rain?.rateCurrent}} in/hr</span></div>
    <div><span>Last 15 Minutes: </span><span>{{rain?.total15M}}</span></div>
    <div><span>Last Hour: </span><span>{{rain?.total1H}}</span></div>
    <div><span>Last 24 Hours: </span><span>{{rain?.total24H}}</span></div>
    <div><span>Day: </span><span>{{rain?.totalToday}}</span></div>
    <div><span>Month: </span><span>{{rain?.totalMonth}}</span></div>
    <div><span>Year: </span><span>{{rain?.totalYear}}</span></div>
  `,
  selector:'rain-summary'
})
export class RainSummary {
  @Input() rain: IRain
}
