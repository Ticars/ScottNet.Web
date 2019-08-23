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
var operators_1 = require("rxjs/operators");
var RegistrationFormComponent = /** @class */ (function () {
    function RegistrationFormComponent(formBuilder, router, userService, alertService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.isRequesting = false;
        this.submitted = false;
    }
    RegistrationFormComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            confirmPassword: ['', [forms_1.Validators.required]]
        }, { validator: this.mustMatch('password', 'confirmPassword') });
    };
    RegistrationFormComponent.prototype.mustMatch = function (controlName, matchingControlName) {
        return function (formGroup) {
            var control = formGroup.controls[controlName];
            var matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    };
    Object.defineProperty(RegistrationFormComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrationFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.isRequesting = true;
        this.userService.register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            _this.alertService.success('<strong>Account Created!</strong> Please validate your email before logging in', true);
            _this.router.navigate(['/login'], { queryParams: { email: _this.f.email.value } });
        }, function (error) {
            if (error.error.success !== undefined) { //if we're a snet error
                _this.alertService.error(error.error.message);
            }
            else {
                _this.alertService.error(error.message);
                console.log(error);
            }
        });
    };
    RegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-registration-form',
            templateUrl: './registration-form.component.html',
            styleUrls: ['./registration-form.component.css']
        })
    ], RegistrationFormComponent);
    return RegistrationFormComponent;
}());
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registration-form.component.js.map