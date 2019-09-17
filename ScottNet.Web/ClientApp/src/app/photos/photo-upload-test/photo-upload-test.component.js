"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var PhotoUploadTestComponent = /** @class */ (function () {
    function PhotoUploadTestComponent(photoService, userService) {
        this.photoService = photoService;
        this.userService = userService;
        this.isLoggedOn = userService.isAuthenticated();
    }
    PhotoUploadTestComponent.prototype.ngOnInit = function () {
        this.messages = [];
    };
    PhotoUploadTestComponent.prototype.uploadFile = function (files) {
        var _this = this;
        console.log('uploading ' + files.length);
        if (files.length === 0) {
            return;
        }
        var fileToUpload = files[0];
        var formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.progress = 0;
        this.uploadInProgress = true;
        this.photoService
            .postImage(formData)
            .subscribe(function (event) {
            switch (event.type) {
                case http_1.HttpEventType.Sent:
                    console.log('Request sent!');
                    _this.uploadInProgress = false;
                    _this.myInputVariable.nativeElement.value = null;
                    break;
                case http_1.HttpEventType.ResponseHeader:
                    console.log('Response header received!');
                    break;
                case http_1.HttpEventType.UploadProgress:
                    _this.progress = Math.round(100 * event.loaded / event.total);
                    console.log('download %' + _this.progress);
                    console.log("Download in progress! " + Math.round(event.loaded / 1024) + "Kb loaded");
                    break;
                case http_1.HttpEventType.DownloadProgress:
                    break;
                case http_1.HttpEventType.Response:
                    console.log('Done!', event.body);
            }
        }, function (error) { console.log('component'); });
    };
    PhotoUploadTestComponent.prototype.callSecure = function () {
        var _this = this;
        this.messages = [];
        this.photoService.testSecure().subscribe(function (result) {
            console.log(result);
            _this.messages = _this.messages.concat(result);
        });
        this.photoService.testSecure().subscribe(function (result) {
            console.log(result);
            _this.messages = _this.messages.concat(result);
        });
    };
    PhotoUploadTestComponent.prototype.uploadFiles = function (files) {
        //// The given files collection is actually a "live collection", which means that
        //// it will be cleared once the Input is cleared. As such, we need to create a
        //// local copy of it so that it doesn't get cleared during the asynchronous file
        //// processing within the for-of loop.
        //for (var file of Array.from(files)) {
        //  try {
        //    this.uploads.push(
    };
    __decorate([
        core_1.ViewChild('file')
    ], PhotoUploadTestComponent.prototype, "myInputVariable", void 0);
    PhotoUploadTestComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-upload-test',
            templateUrl: './photo-upload-test.component.html',
            styleUrls: ['./photo-upload-test.component.css']
        })
    ], PhotoUploadTestComponent);
    return PhotoUploadTestComponent;
}());
exports.PhotoUploadTestComponent = PhotoUploadTestComponent;
//# sourceMappingURL=photo-upload-test.component.js.map