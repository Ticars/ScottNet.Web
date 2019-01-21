import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { WeatherReadingModel } from "./weatherModels";


@Injectable()
export class WeatherDataService {
  public currentWeather: WeatherReadingModel
  constructor(private http: HttpClient) {
  }

  getCurrentReading(): Observable<WeatherReadingModel> {
    return this.http.get<WeatherReadingModel>('/api/WeatherReading/Current');
  }

 
}
