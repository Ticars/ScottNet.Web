import { NgModule } from "@angular/core";
import { CurrentWeather, RawWeather, TempHumWidget, WindVane, RainSummary } from './index'
import { RouterModule } from "@angular/router";
import { weatherRoutes } from "./weather.routes";
import { CommonModule } from "@angular/common";
import { AppModule } from "../app.module";
import { SharedModule } from "../shared/shared.module";

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
    RainSummary
  ],
  providers: [
  ],
  exports: [
  ]
})
export class WeatherModule {
}
