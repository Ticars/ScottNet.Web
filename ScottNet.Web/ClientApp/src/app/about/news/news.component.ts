import { Component } from '@angular/core';
import { CurrentWeatherService } from '../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor(private currentWeather: CurrentWeatherService) {
  }
  ngOnInit() {
  }
}
