import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { WeatherReadingModel, DailyWeatherForecast, WeatherSummary } from "./weatherModels";


@Injectable()
export class WeatherDataService {
  constructor(private http: HttpClient) {
  }

  getCurrentReading(): Observable<WeatherReadingModel> {
    
    return this.http.get<WeatherReadingModel>('/api/WeatherReading/Current')
      .pipe(map(res => new WeatherReadingModel(res)));
  }

  getDailyForecasts(): Observable<DailyWeatherForecast[]> {
    return this.http.get<DailyWeatherForecast[]>('/api/Forecast/Daily');
  }

  getWeatherSummaries(): Observable<WeatherSummary[]> {
    return this.http.get<WeatherSummary[]>('/api/weatherSummary')
      .pipe(
        map(items => {
          return items.map(
            item => {
              item.readingTime = new Date(item.readingTime.toString());
              return item;
            }
          );
        })
      );
    }

 
}

