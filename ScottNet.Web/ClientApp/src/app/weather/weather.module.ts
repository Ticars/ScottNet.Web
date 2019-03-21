import { NgModule } from "@angular/core";
import { CurrentWeather, RawWeather, TempHumWidget, WindVane, RainSummary } from './index'
import { RouterModule } from "@angular/router";
import { weatherRoutes } from "./weather.routes";
import { CommonModule } from "@angular/common";
import { AppModule } from "../app.module";
import { SharedModule } from "../shared/shared.module";
import { WeatherMenuComponent } from './weather-menu/weather-menu.component';
import { Forecasts } from "./forecasts/forecast.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(weatherRoutes),
    SharedModule
  ],
  declarations: [
    CurrentWeather,
    RawWeather,
    TempHumWidget,
    WindVane,
    RainSummary,
    WeatherMenuComponent,
    Forecasts
  ],
  providers: [
  ],
  exports: [
  ]
})
export class WeatherModule {
}
