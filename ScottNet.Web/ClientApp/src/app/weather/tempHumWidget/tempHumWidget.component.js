"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TempHumWidget = /** @class */ (function () {
    function TempHumWidget(currentWeather) {
        this.currentWeather = currentWeather;
    }
    __decorate([
        core_1.Input()
    ], TempHumWidget.prototype, "humTemp", void 0);
    __decorate([
        core_1.Input()
    ], TempHumWidget.prototype, "windChill", void 0);
    __decorate([
        core_1.Input()
    ], TempHumWidget.prototype, "heatIndex", void 0);
    __decorate([
        core_1.Input()
    ], TempHumWidget.prototype, "icon", void 0);
    TempHumWidget = __decorate([
        core_1.Component({
            selector: 'temp-humidty',
            template: "\n<div style='width:100%'>\n    <div class='temp-hum'>\n<temperature [temperature]=\"humTemp?.temperature\"></temperature>  / {{humTemp?.humidity}}%\n<img class=\"forecast-icon float-right\" *ngIf=\"icon?.length>0\" [src]=\"icon\" />\n</div>\n<span *ngIf=\"windChill && windChill < 35\" class=\"small red\" >Wind Chill: {{windChill}} </span>\n<span *ngIf=\"heatIndex && heatIndex > 82\" class=\"small red\">Heat Index: {{heatIndex}} </span>\n</div>\n",
            styles: ["\n    .red { color: red; }\n    .blue { color: blue; }\n    .temp-hum {font-size:22px;}\n    .forecast-icon { width:80px;}\n"]
        })
    ], TempHumWidget);
    return TempHumWidget;
}());
exports.TempHumWidget = TempHumWidget;
//# sourceMappingURL=tempHumWidget.component.js.map