"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var base_service_1 = require("./base.service");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    //public jwtHelper: JwtHelperService,
    function UserService(http, router) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.router = router;
        _this.baseUrl = '';
        // Observable navItem source
        _this._authNavStatusSource = new rxjs_1.BehaviorSubject(false);
        // Observable navItem stream
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        var authString = localStorage.getItem('authObject');
        if (authString) {
            _this.authObj = JSON.parse(authString);
            // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
            // header component resulting in authed user nav links disappearing despite the fact user is still logged in
            _this._authNavStatusSource.next(!!_this.authObj);
        }
        _this.baseUrl = '/api';
        return _this;
    }
    UserService.prototype.getAuthentication = function () {
        var authString = localStorage.getItem('authObject');
        if (authString) {
            return JSON.parse(authString);
        }
        else {
            return null;
        }
    };
    UserService.prototype.register = function (email, password, firstName, lastName) {
        var body = JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName });
        return this.http.post(this.baseUrl + "/account", body);
    };
    UserService.prototype.confirmEmail = function (userId, token) {
        return this.http.post(this.baseUrl + "/account/confirmEmail", JSON.stringify({ userId: userId, token: token }));
    };
    UserService.prototype.resendConfirmation = function (email) {
        return this.http.post(this.baseUrl + "/account/resendEmail", JSON.stringify(email));
    };
    UserService.prototype.login = function (userName, password) {
        var _this = this;
        return this.http
            .post(this.baseUrl + '/auth/login', JSON.stringify({ userName: userName, password: password })).pipe(operators_1.map(function (res) {
            _this.setLogin(res);
            return { valid: true, error: '', statusCode: 200 };
        }), operators_1.catchError(function (error) {
            return rxjs_1.of({ valid: false, error: error.error, statusCode: error.status });
        }));
    };
    UserService.prototype.refresh = function () {
        var _this = this;
        var auth = this.getAuthentication();
        if (auth) {
            return this.http
                .post(this.baseUrl + '/auth/refresh', JSON.stringify(auth.refreshToken)).pipe(operators_1.map(function (res) {
                _this.setLogin(res);
                return res;
            }));
        }
        else { //not authenticated
            console.log('error in refresh');
            return rxjs_1.of(null);
        }
    };
    UserService.prototype.isAuthenticated = function () {
        var auth = JSON.parse(localStorage.getItem('authObject'));
        return auth != null;
    };
    UserService.prototype.setLogin = function (auth) {
        console.debug("login authtoken: " + auth.token);
        localStorage.setItem('authObject', JSON.stringify(auth));
        this.authObj = auth;
        this._authNavStatusSource.next(true);
    };
    UserService.prototype.logout = function () {
        var auth = this.getAuthentication();
        if (auth) {
            console.debug('user.logout(): logging user out');
            this.http
                .post(this.baseUrl + '/auth/logout', JSON.stringify(auth.refreshToken)).toPromise();
            localStorage.removeItem('authObject');
        }
        else {
            console.debug('user.logout(): not logged in');
        }
        this.authObj = null;
        this._authNavStatusSource.next(false);
        this.router.navigate(['/login']);
    };
    UserService.prototype.passwordResetRequest = function (lastName, email) {
        return this.http.post(this.baseUrl + "/account/passwordResetRequest", JSON.stringify({ lastName: lastName, email: email }));
    };
    UserService.prototype.passwordReset = function (userId, token, password) {
        return this.http.post(this.baseUrl + "/account/passwordReset", JSON.stringify({ userId: userId, token: token, password: password }));
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map