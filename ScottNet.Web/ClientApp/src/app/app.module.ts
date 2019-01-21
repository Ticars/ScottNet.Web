import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent, Toggler, SNFooter } from './common/index';
import { HomeComponent } from './home/home.component';
import { ToDoComponent } from './to-do/to-do.component';
import { WeatherDataService, CurrentWeatherService } from './shared/index'
import { CurrentWeather, RawWeather, AutoUpdateToggle, Temperature } from './weather/index'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ToDoComponent,
    CurrentWeather,
    RawWeather,
    Toggler,
    SNFooter,
    AutoUpdateToggle,
    Temperature

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'to-do', component: ToDoComponent },
      { path: 'weather', component: CurrentWeather },
    ])
  ],
  providers: [
    WeatherDataService,
    CurrentWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
