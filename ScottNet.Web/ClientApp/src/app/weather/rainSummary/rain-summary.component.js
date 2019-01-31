"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RainSummary = /** @class */ (function () {
    function RainSummary() {
    }
    __decorate([
        core_1.Input()
    ], RainSummary.prototype, "rain", void 0);
    RainSummary = __decorate([
        core_1.Component({
            template: "\n    <div><span>Current Rate: </span><span>{{rain?.rateCurrent}} in/hr</span></div>\n    <div><span>Last 15 Minutes: </span><span>{{rain?.total15M}}</span></div>\n    <div><span>Last Hour: </span><span>{{rain?.total1H}}</span></div>\n    <div><span>Last 24 Hours: </span><span>{{rain?.total24H}}</span></div>\n    <div><span>Day: </span><span>{{rain?.totalToday}}</span></div>\n    <div><span>Month: </span><span>{{rain?.totalMonth}}</span></div>\n    <div><span>Year: </span><span>{{rain?.totalYear}}</span></div>\n  ",
            selector: 'rain-summary'
        })
    ], RainSummary);
    return RainSummary;
}());
exports.RainSummary = RainSummary;
//# sourceMappingURL=rain-summary.component.js.map