"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SNFooter = /** @class */ (function () {
    function SNFooter(curWeatherSvc) {
        this.curWeatherSvc = curWeatherSvc;
    }
    SNFooter.prototype.ngOnInit = function () {
        var _this = this;
        this.toggleChecked = true;
        this.curWeatherSvc.weatherReading.subscribe(function (cw) {
            _this.currentReading = cw;
        });
    };
    SNFooter.prototype.toggled = function (event) {
        console.log(event);
    };
    SNFooter = __decorate([
        core_1.Component({
            templateUrl: './footer.component.html',
            selector: 'snfooter',
            styleUrls: ['./footer.component.css']
        })
    ], SNFooter);
    return SNFooter;
}());
exports.SNFooter = SNFooter;
//# sourceMappingURL=footer.component.js.map