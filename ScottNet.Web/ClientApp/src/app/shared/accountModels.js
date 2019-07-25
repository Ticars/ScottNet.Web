"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = /** @class */ (function () {
    function Auth(other) {
        this.identityId = other.identityId;
        this.token = other.token;
        this.duration = other.duration;
        this.firstName = other.firstName;
        this.lastName = other.lastName;
        this.userName = other.userName;
        this.email = other.email;
        if (!other.createDate) {
            this.createDate = Date.now();
        }
        else {
            this.createDate = other.createDate;
        }
    }
    Auth.prototype.expiresIn = function () {
        return (this.createDate + this.duration) - Date.now();
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=accountModels.js.map