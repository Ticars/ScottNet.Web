import { Component } from '@angular/core';
import { CurrentWeatherService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private currentWeather: CurrentWeatherService) {
  }
  ngOnInit() {
  }
}
