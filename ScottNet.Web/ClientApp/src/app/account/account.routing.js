"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./index");
exports.routing = router_1.RouterModule.forChild([
    { path: 'register', component: index_1.RegistrationFormComponent },
    { path: 'login', component: index_1.LoginFormComponent }
]);
//# sourceMappingURL=account.routing.js.map