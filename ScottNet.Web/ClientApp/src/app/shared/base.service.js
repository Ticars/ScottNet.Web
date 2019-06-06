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
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = "Error: " + error.error.message;
        }
        else {
            // server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.error;
        }
        return rxjs_1.throwError(errorMessage);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map