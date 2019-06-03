import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent, Toggler, SNFooter } from './common/index';
import { WeatherDataService, CurrentWeatherService, UserService } from './shared/index'
import { AutoUpdateToggle, Temperature } from './weather/index'
import { appRoutes } from './routes';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    Toggler,
    SNFooter,
    AutoUpdateToggle

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    SharedModule,
    AccountModule
  ],
  providers: [
    WeatherDataService,
    CurrentWeatherService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
