"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(formBuilder, router, userService, route, alertService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.isRequesting = false;
        this.submitted = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            confirmPassword: ['', [forms_1.Validators.required]]
        });
    };
    Object.defineProperty(ResetPasswordComponent.prototype, "f", {
        get: function () { return this.resetPasswordForm.controls; },
        enumerable: true,
        configurable: true
    });
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.submitted = true;
        var userId = this.route.snapshot.queryParamMap.get('userId');
        var token = this.route.snapshot.queryParamMap.get('token');
        // stop here if form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }
        this.isRequesting = true;
        this.userService.passwordReset(userId, token, this.f.password.value).subscribe(function (result) {
            _this.alertService.success("Your password has been reset.  Please login.", false, true);
            _this.router.navigate(['/login']);
        }, function (error) {
            if (error.error.success !== undefined) {
                if (error.error.apiError.errorCode === 'RPEXP') {
                    _this.alertService.error('Email is not registered.   Please re-enter email or <a href="/register">register</a>', true, false);
                }
                else if (error.error.apiError.errorCode === 'REACV') {
                    _this.alertService.error('Email is already confirmed.  Please re-enter email or <a href="/login">login</a>', true, false);
                }
                else {
                    _this.alertService.error(error.error.message, false, false);
                }
            }
            else {
                _this.alertService.error(error.message, false, false);
            }
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.css']
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map