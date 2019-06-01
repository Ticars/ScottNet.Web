import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { WeatherReadingModel } from "./weatherModels"
import { WeatherDataService } from "./weatherData.service"
import { Observable, of, BehaviorSubject } from "rxjs";

@Injectable()
export class CurrentWeatherService {
  private dataStore: { currentReading: WeatherReadingModel,  updates: number }
  private updaterId: number = -1
  private _weatherReading: BehaviorSubject<WeatherReadingModel>;
  public weatherReading: Observable<WeatherReadingModel>
  public dataRetrieved: EventEmitter<number> = new EventEmitter<number>();


  constructor(private data: WeatherDataService) {
    this.dataStore = { currentReading: null, updates: 0 }
    this._weatherReading = <BehaviorSubject<WeatherReadingModel>>new BehaviorSubject(this.dataStore.currentReading);
    this.weatherReading = this._weatherReading.asObservable();
    this.setAutoRefresh(true);
  }

  get updates():number {
    return this.dataStore.updates
  }

  setAutoRefresh(refresh: boolean) {
    if (refresh) {
      this.updateReading();
      this.updaterId = window.setInterval(() => { this.updateReading(); }, 60 * 1000);
    } else {
      if (this.updaterId >= 0) {
        clearInterval(this.updaterId);
        this.updaterId = -1
      }
    }
  }

  isAutoRefresh(): boolean {
    return this.updaterId >= 0;
  }

  updateReading() {
    console.log("Updating Current Weather")
    this.data.getCurrentReading().subscribe(data => {
      this.dataStore.currentReading = data;
      this.dataStore.updates++

      this._weatherReading.next(Object.assign({}, this.dataStore).currentReading);
      this.dataRetrieved.emit(this.dataStore.updates)
    });
  }


  
}
