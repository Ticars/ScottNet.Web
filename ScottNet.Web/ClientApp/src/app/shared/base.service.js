"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    BaseService.prototype.handleServiceError = function (operation, result, throwError) {
        if (operation === void 0) { operation = 'operation'; }
        if (throwError === void 0) { throwError = false; }
        return function (error) {
            console.error(error);
            if (throwError) {
                throw (error);
            }
            else {
                return rxjs_1.of(result);
            }
        };
    };
    BaseService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        // either applicationError in header or model error in body
        if (applicationError) {
            return rxjs_1.Observable.throw(applicationError);
        }
        var modelStateErrors = '';
        var serverError = error.json();
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return rxjs_1.Observable.throw(modelStateErrors || 'Server error');
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map