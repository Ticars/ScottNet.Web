"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WindVane = /** @class */ (function () {
    function WindVane() {
    }
    WindVane.prototype.getArrowStyles = function () {
        var directionString = 'rotate(' + this.windDirection + 'deg)';
        return {
            'WebkitTransform': directionString,
            'MozTransform': directionString,
            'OTransform': directionString,
            'msTransform': directionString
        };
    };
    __decorate([
        core_1.Input()
    ], WindVane.prototype, "windSpeed", void 0);
    __decorate([
        core_1.Input()
    ], WindVane.prototype, "windDirection", void 0);
    WindVane = __decorate([
        core_1.Component({
            template: "\n      <div class=\"compass\">\n        <div class=\"arrow\" [ngStyle]=\"getArrowStyles()\">\n          <span class=\"hiddenArrow\"></span>\n          <span class=\"visibleArrow\"></span>\n        </div>\n        <span class=\"speed\">{{windSpeed}}<span>mph</span></span>\n      </div>\n",
            styleUrls: ['./windvane.component.css'],
            selector: 'wind-vane'
        })
    ], WindVane);
    return WindVane;
}());
exports.WindVane = WindVane;
//# sourceMappingURL=windvane.component.js.map