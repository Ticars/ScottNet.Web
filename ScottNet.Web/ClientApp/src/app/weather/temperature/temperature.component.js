"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Temperature = /** @class */ (function () {
    function Temperature() {
    }
    Temperature.prototype.getColor = function () {
        if (this.temperature > 85) {
            return "#FF0000";
        }
        else if (this.temperature < 35) {
            return "#0000FF";
        }
        else {
            return "#00AF00";
        }
    };
    __decorate([
        core_1.Input()
    ], Temperature.prototype, "temperature", void 0);
    Temperature = __decorate([
        core_1.Component({
            template: "\n    <span class=\"temperature ml-4\" [ngStyle]=\"{'color':getColor()}\">{{temperature| number:'1.0-0'}}&deg;F</span>\n",
            selector: 'temperature'
        })
    ], Temperature);
    return Temperature;
}());
exports.Temperature = Temperature;
//# sourceMappingURL=temperature.component.js.map