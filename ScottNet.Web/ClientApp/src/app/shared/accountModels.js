"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obAuth = /** @class */ (function () {
    function obAuth(other) {
        this.identityId = other.identityId;
        this.token = other.token;
        this.firstName = other.firstName;
        this.lastName = other.lastName;
        this.userName = other.userName;
        this.email = other.email;
        this.refreshToken = other.refreshToken;
        if (!other.createDate) {
            this.createDate = Date.now();
        }
        else {
            this.createDate = other.createDate;
        }
    }
    return obAuth;
}());
exports.obAuth = obAuth;
//# sourceMappingURL=accountModels.js.map