import { Injectable, OnInit } from "@angular/core";
import { WeatherReadingModel } from "./weatherModels"
import { WeatherDataService } from "./weatherData.service"
import { Observable, of } from "rxjs";

@Injectable()
export class CurrentWeatherService {
  public currentReading: WeatherReadingModel
  private updaterId: number = -1
  public updates: number = 0
  constructor(private data: WeatherDataService) {
    this.currentReading = new WeatherReadingModel()
    this.updateReading();
    this.setAutoRefresh(true);
  }

  setAutoRefresh(refresh: boolean) {
    if (refresh) {
      this.updateReading();
      this.updaterId = setInterval(() => { this.updateReading(); }, 60 * 1000);
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
    this.updates++
    console.log("Updating Current Weather")
    this.data.getCurrentReading().subscribe(data => {
      this.currentReading = data;
    });
  }
  
}
