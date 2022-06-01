"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var photo_upload_component_1 = require("./photo-upload/photo-upload.component");
var shared_1 = require("../shared");
var photo_upload_test_component_1 = require("./photo-upload-test/photo-upload-test.component");
var photo_viewer_component_1 = require("./photo-viewer/photo-viewer.component");
exports.photoRouting = router_1.RouterModule.forChild([
    { path: 'photo', component: photo_viewer_component_1.PhotoViewerComponent },
    { path: 'photo/upload', component: photo_upload_component_1.PhotoUploadComponent, canActivate: [shared_1.AuthGuardService] },
    { path: 'photo/test', component: photo_upload_test_component_1.PhotoUploadTestComponent, canActivate: [shared_1.AuthGuardService] },
    { path: 'photo/viewer', component: photo_viewer_component_1.PhotoViewerComponent }
]);
//# sourceMappingURL=photo.routing.js.map