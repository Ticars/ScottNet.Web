"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var RefreshTokenInterceptor = /** @class */ (function () {
    function RefreshTokenInterceptor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    }
    RefreshTokenInterceptor.prototype.addHeaders = function (request, authorization) {
        var token = authorization ? authorization.token : '';
        if (request.headers.has('No-Content-Type')) {
            return request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });
        }
        else if (request.headers.has('Content-Type')) {
            return request.clone({
                setHeaders: {
                    'Content-Type': request.headers.get('Content-Type'),
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });
        }
        else {
            return request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });
        }
    };
    RefreshTokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var authData = this.auth.getAuthentication();
        console.debug('executing request: ' + request.url);
        var initialRequest = this.addHeaders(request, authData);
        return next.handle(initialRequest)
            .pipe(operators_1.catchError(function (error) {
            if (error.status === 401) {
                //if refresh fails 401, logout
                if (request.url.indexOf("/auth/refresh") >= 0) {
                    _this.auth.logout();
                }
                //for any authentication 401, throw error
                if (request.url.indexOf("/auth/") >= 0) {
                    console.log('401 error in auth call');
                    return rxjs_1.throwError(error);
                }
                //for any non-authentication calls, check for token expired, else logout
                if (authData
                    && error.headers.has('token-expired')) {
                    if (!_this.isRefreshing) {
                        _this.isRefreshing = true;
                        _this.refreshTokenSubject.next(null);
                        //Genrate params for token refreshing
                        console.debug('httpInterceptor: token expired, refresh token');
                        return _this.auth.refresh().pipe(operators_1.switchMap(function (retryAuth) {
                            if (retryAuth) {
                                _this.isRefreshing = false;
                                _this.refreshTokenSubject.next(retryAuth);
                                var retryRequest = _this.addHeaders(request, retryAuth);
                                console.debug("calling " + retryRequest.url + " with refreshed auth token");
                                return next.handle(retryRequest);
                            }
                            else {
                                console.debug('httpInterceptor: Failed to refresh token');
                                return rxjs_1.of(null);
                            }
                        }), operators_1.catchError(function (refreshError) {
                            console.log("httpInterceptor: Error refreshing login token");
                            _this.auth.logout();
                            return rxjs_1.throwError(refreshError);
                        }));
                    }
                    else {
                        return _this.refreshTokenSubject.pipe(operators_1.filter(function (token) { return token != null; }), operators_1.take(1), operators_1.switchMap(function (auth) {
                            return next.handle(_this.addHeaders(request, auth));
                        }));
                    }
                } //no auth data or token not expired
                else {
                    _this.auth.logout();
                    console.debug("httpInterceptor: user not logged in error");
                    return rxjs_1.throwError(error);
                }
            } //if of 401/expired token check
            else {
                console.debug('httpInterceptor: non 401 http error');
                return rxjs_1.throwError(error); //non-401 token expired call
            }
        }) //catch error of primary request
        ); //pipe of primary call;
    }; //intercept function
    RefreshTokenInterceptor = __decorate([
        core_1.Injectable()
    ], RefreshTokenInterceptor);
    return RefreshTokenInterceptor;
}()); //class
exports.RefreshTokenInterceptor = RefreshTokenInterceptor;
//# sourceMappingURL=httpInterceptor.service.js.map