import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent, Toggler, SNFooter, AlertComponent } from './common/index';
import { WeatherDataService, CurrentWeatherService, UserService, AlertService } from './shared/index'
import { AutoUpdateToggle, Temperature } from './weather/index'
import { appRoutes } from './routes';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { PhotosModule } from './photos/photos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './shared/httpInterceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    Toggler,
    SNFooter,
    AutoUpdateToggle,
    AlertComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    SharedModule,
    AccountModule,
    PhotosModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    WeatherDataService,
    CurrentWeatherService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
