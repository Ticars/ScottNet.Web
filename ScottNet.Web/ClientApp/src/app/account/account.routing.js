"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./index");
var confirm_email_component_1 = require("./confirm-email/confirm-email.component");
exports.routing = router_1.RouterModule.forChild([
    { path: 'register', component: index_1.RegistrationFormComponent },
    { path: 'login', component: index_1.LoginFormComponent },
    { path: 'account/confirm', component: confirm_email_component_1.ConfirmEmailComponent }
]);
//# sourceMappingURL=account.routing.js.map