"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var photo_upload_component_1 = require("./photo-upload/photo-upload.component");
exports.photoRouting = router_1.RouterModule.forChild([
    { path: 'photoUpload', component: photo_upload_component_1.PhotoUploadComponent },
    { path: 'photo/upload', component: photo_upload_component_1.PhotoUploadComponent }
]);
//# sourceMappingURL=photo.routing.js.map