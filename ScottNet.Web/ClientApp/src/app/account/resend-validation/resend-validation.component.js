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
var ResendValidationComponent = /** @class */ (function () {
    function ResendValidationComponent(formBuilder, router, userService, alertService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.isRequesting = false;
        this.submitted = false;
    }
    ResendValidationComponent.prototype.ngOnInit = function () {
        this.confirmSend = this.formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    };
    Object.defineProperty(ResendValidationComponent.prototype, "f", {
        get: function () { return this.confirmSend.controls; },
        enumerable: true,
        configurable: true
    });
    ResendValidationComponent.prototype.sendEmail = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.confirmSend.invalid) {
            return;
        }
        this.isRequesting = true;
        this.userService.resendConfirmation(this.f.email.value).subscribe(function (result) {
            _this.alertService.success("Please confirm your email before logging in", false, true);
            _this.router.navigate(['/login']);
        }, function (error) {
            if (error.error.success !== undefined) {
                if (error.error.apiError.errorCode === 'REINV') {
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
    ResendValidationComponent = __decorate([
        core_1.Component({
            selector: 'app-resend-validation',
            templateUrl: './resend-validation.component.html',
            styleUrls: ['./resend-validation.component.css']
        })
    ], ResendValidationComponent);
    return ResendValidationComponent;
}());
exports.ResendValidationComponent = ResendValidationComponent;
//# sourceMappingURL=resend-validation.component.js.map