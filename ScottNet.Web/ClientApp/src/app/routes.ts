import { Routes } from "@angular/router";


export const appRoutes: Routes = [
  { path: '', redirectTo:'/weather', pathMatch: 'full' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'weather', loadChildren: './weather/weather.module#WeatherModule' }
];
