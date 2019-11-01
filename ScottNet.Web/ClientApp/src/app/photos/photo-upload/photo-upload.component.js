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
var forms_1 = require("@angular/forms");
var PhotoUploadComponent = /** @class */ (function () {
    function PhotoUploadComponent(formBuilder, alertService, photoService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.photoService = photoService;
    }
    PhotoUploadComponent.prototype.ngOnInit = function () {
        this.photoUploadForm = this.formBuilder.group({
            description: ['', [forms_1.Validators.required]],
            file: [null, [forms_1.Validators.required]]
        });
    };
    PhotoUploadComponent.prototype.preview = function (files) {
        var _this = this;
        if (files.length === 0)
            return;
        this.fileToUpload = files[0];
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.alertService.error("Only images are supported.");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    Object.defineProperty(PhotoUploadComponent.prototype, "f", {
        get: function () { return this.photoUploadForm.controls; },
        enumerable: true,
        configurable: true
    });
    PhotoUploadComponent.prototype.clearValues = function () {
        this.f.description.setValue('');
        this.imgURL = null;
        this.fileToUpload = null;
    };
    PhotoUploadComponent.prototype.photoUpload = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.photoUploadForm.invalid) {
            this.alertService.error('Upload Form Invalid');
            return;
        }
        this.isRequesting = true;
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('description', this.f.description.value);
        this.progress = 0;
        this.photoService
            .postImage(formData)
            .subscribe(function (event) {
            switch (event.type) {
                case http_1.HttpEventType.Sent:
                    console.log('Request sent!');
                    _this.uploadInProgress = false;
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
                    _this.alertService.success('File Uploaded');
                    _this.clearValues();
                    _this.submitted = false;
            }
        }, function (error) { console.log('component'); });
        this.isRequesting = false;
    };
    PhotoUploadComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-upload',
            templateUrl: './photo-upload.component.html',
            styleUrls: ['./photo-upload.component.css']
        })
    ], PhotoUploadComponent);
    return PhotoUploadComponent;
}());
exports.PhotoUploadComponent = PhotoUploadComponent;
//# sourceMappingURL=photo-upload.component.js.map