"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ConfirmEmailComponent = /** @class */ (function () {
    function ConfirmEmailComponent(userService, route, router, alertService) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.emailConfirmed = false;
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userId = this.route.snapshot.queryParamMap.get('userId');
        var token = this.route.snapshot.queryParamMap.get('token');
        if (userId && token) {
            this.userService.confirmEmail(userId, token).subscribe(function (result) {
                _this.alertService.success("Congratulations, your account has been verified.   Please login!", false, true);
                _this.router.navigate(['/login']);
            });
        }
    };
    ConfirmEmailComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm-email',
            templateUrl: './confirm-email.component.html',
            styleUrls: ['./confirm-email.component.css']
        })
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
exports.ConfirmEmailComponent = ConfirmEmailComponent;
//# sourceMappingURL=confirm-email.component.js.map