"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RawWeather = /** @class */ (function () {
    function RawWeather(currentWeatherService) {
        this.currentWeatherService = currentWeatherService;
    }
    RawWeather.prototype.ngOnInit = function () {
        var _this = this;
        this.currentWeatherService.weatherReading.subscribe(function (wr) { return _this.currentReading = wr; });
    };
    RawWeather = __decorate([
        core_1.Component({
            template: "\n<div class=\"container small\">\n  <div  *ngFor=\"let item of currentReading | keyvalue\">\n    <b>{{item.key}}</b>: {{item.value}}\n  </div>\n  <b>Updates</b>: {{currentWeatherService.updates}}\n</div>\n  ",
            selector: 'raw-weather'
        })
    ], RawWeather);
    return RawWeather;
}());
exports.RawWeather = RawWeather;
//# sourceMappingURL=rawWeather.component.js.map