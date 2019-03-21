"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Forecasts = /** @class */ (function () {
    function Forecasts(weatherService) {
        this.weatherService = weatherService;
        this.maxForecasts = 6;
    }
    Forecasts.prototype.ngOnInit = function () {
        var _this = this;
        this.weatherService.getDailyForecasts().subscribe(function (forecasts) {
            _this.forecasts = forecasts;
            if (_this.forecasts.length > _this.maxForecasts) {
                _this.forecasts = _this.forecasts.slice(0, _this.maxForecasts);
            }
            console.log("forecast count" + _this.forecasts.length);
        });
    };
    Forecasts = __decorate([
        core_1.Component({
            selector: 'forecasts',
            templateUrl: 'forecast.component.html'
        })
    ], Forecasts);
    return Forecasts;
}());
exports.Forecasts = Forecasts;
//# sourceMappingURL=forecast.component.js.map