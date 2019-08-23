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
var ResetPasswordRequestComponent = /** @class */ (function () {
    function ResetPasswordRequestComponent(formBuilder, router, userService, alertService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.isRequesting = false;
        this.submitted = false;
    }
    ResetPasswordRequestComponent.prototype.ngOnInit = function () {
        this.resetRequestForm = this.formBuilder.group({
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    };
    Object.defineProperty(ResetPasswordRequestComponent.prototype, "f", {
        get: function () { return this.resetRequestForm.controls; },
        enumerable: true,
        configurable: true
    });
    ResetPasswordRequestComponent.prototype.requestReset = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.resetRequestForm.invalid) {
            return;
        }
        this.isRequesting = true;
        this.userService.passwordResetRequest(this.f.lastName.value, this.f.email.value).subscribe(function (result) {
            _this.alertService.success("Please check your email for password reset link", false, true);
            _this.router.navigate(['/login']);
        }, function (error) {
            if (error.error.success !== undefined) {
                _this.alertService.error('Last name and email do not match a registered account. Please re-enter email and/or last name.', true, false);
            }
            else {
                _this.alertService.error(error.message, false, false);
            }
        });
    };
    ResetPasswordRequestComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password-request',
            templateUrl: './reset-password-request.component.html',
            styleUrls: ['./reset-password-request.component.css']
        })
    ], ResetPasswordRequestComponent);
    return ResetPasswordRequestComponent;
}());
exports.ResetPasswordRequestComponent = ResetPasswordRequestComponent;
//# sourceMappingURL=reset-password-request.component.js.map