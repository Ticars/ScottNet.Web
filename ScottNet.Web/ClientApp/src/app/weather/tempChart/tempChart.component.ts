import { Component } from "@angular/core";
import { WeatherDataService } from "../../shared";

@Component({
  templateUrl: 'tempChart.component.html',
  selector: 'temp-chart'
})
export class TempChartComponent {

  public series2 = [
    {
      "name": "Outdoor Temp",
      "series": []
    }
  ];
  dataLoaded = false;

  view: any[] = [800, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(private weatherDataService: WeatherDataService) {
  }

  ngOnInit() {
    this.weatherDataService.getWeatherSummaries().subscribe(
      result => {
        console.log(result);
        console.log(result.map(function (ws) { return { value: ws.indoorTemp, name: ws.readingTime } }));
        console.log(this.series2.length);
        this.series2[0].series = result.map(function (ws) { return { name: ws.readingTime, value: ws.indoorTemp } });
        console.log(this.series2);
        this.dataLoaded = true;
      }
    );
  }

}
