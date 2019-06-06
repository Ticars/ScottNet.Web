"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PhotoUploadComponent = /** @class */ (function () {
    function PhotoUploadComponent() {
    }
    PhotoUploadComponent.prototype.ngOnInit = function () {
        var connection = navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'];
        var type = connection.effectiveType;
        alert(type);
    };
    PhotoUploadComponent.prototype.selected = function (event) {
        this.fileProperties = [];
        var file = event.target.files[0];
        for (var key in event.target.files[0]) {
            this.fileProperties.push({ 'prop': key, 'value': file[key] });
        }
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