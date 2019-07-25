import { NgModule } from "@angular/core";
import { CurrentWeather, RawWeather, TempHumWidget, WindVane, RainSummary } from './index'
import { RouterModule } from "@angular/router";
import { weatherRoutes } from "./weather.routes";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { WeatherMenuComponent } from './weather-menu/weather-menu.component';
import { Forecasts } from "./forecasts/forecast.component";
import { TempChartComponent } from "./tempChart/tempChart.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(weatherRoutes),
    SharedModule,
    NgxChartsModule
  ],
  declarations: [
    CurrentWeather,
    RawWeather,
    TempHumWidget,
    WindVane,
    RainSummary,
    WeatherMenuComponent,
    TempChartComponent,
    Forecasts
  ],
  providers: [
  ],
  exports: [
  ]
})
export class WeatherModule {
}
