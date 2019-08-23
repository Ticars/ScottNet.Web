"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(userService, router, activatedRoute, alertService) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.needEmailValidation = false;
        this.badLogin = false;
        this.submitted = false;
        this.src = "/";
        this.credentials = { email: '', password: '' };
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(function (param) {
            _this.credentials.email = param['email'];
            _this.src = param['src'];
        });
    };
    LoginFormComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    };
    LoginFormComponent.prototype.login = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.needEmailValidation = false;
        this.badLogin = false;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.email, value.password)
                .subscribe(function (auth) {
                if (auth.valid) {
                    _this.router.navigate(_this.src ? [_this.src] : ['/']);
                }
                else if (auth.error === 'Confirm Email') {
                    _this.handleConfirmEmail();
                }
                else if (auth.statusCode == 401) {
                    _this.handleBadLogin();
                }
                else {
                    _this.handleGeneralError(auth.statusCode, auth.error);
                }
                _this.isRequesting = false;
            }, function (error) {
                _this.alertService.error(error);
                _this.isRequesting = false;
                console.log(error);
            });
        }
    };
    LoginFormComponent.prototype.handleGeneralError = function (statusCode, error) {
        console.log("Unknown login error, status code: " + statusCode + " text: " + error);
        this.alertService.error("Unknown login error.  Please try again later or contact administrator.", false, false);
    };
    LoginFormComponent.prototype.handleBadLogin = function () {
        this.alertService.error("Invalid email or password.  Please try again.", false, false);
        this.badLogin = true;
    };
    LoginFormComponent.prototype.handleConfirmEmail = function () {
        this.alertService.error("Please confirm email before logging in.", false, false);
        this.needEmailValidation = true;
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map