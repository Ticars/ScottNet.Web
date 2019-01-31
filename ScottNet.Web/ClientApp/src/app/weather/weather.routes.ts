import { CurrentWeather, RawWeather } from "./index";
import { Routes } from "@angular/router";


export const weatherRoutes: Routes = [
  { path: '', component: CurrentWeather },
  { path: 'raw', component: RawWeather }
]
