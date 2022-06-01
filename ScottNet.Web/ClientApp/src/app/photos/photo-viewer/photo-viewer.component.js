"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PhotoViewerComponent = /** @class */ (function () {
    function PhotoViewerComponent(photoService, userService) {
        this.photoService = photoService;
        this.userService = userService;
        this.photoRefreshTimer = rxjs_1.timer(10, 60 * 1000);
        this.maxRefreshes = 60;
    }
    PhotoViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAuthenticated = this.userService.isAuthenticated();
        this.refreshSubscription = this.photoRefreshTimer.subscribe(function (count) {
            console.log("refresh #" + count);
            _this.getRandomImage();
            if (count >= _this.maxRefreshes) {
                _this.refreshSubscription.unsubscribe();
            }
        });
    };
    PhotoViewerComponent.prototype.ngOnDestroy = function () {
        this.refreshSubscription.unsubscribe();
    };
    PhotoViewerComponent.prototype.getRandomImage = function () {
        var _this = this;
        this.photoService.getRandomImage().subscribe(function (result) {
            _this.randomPhoto = result;
            _this.randomPhotoInstance = _this.randomPhoto.instances.filter(function (instance) { return instance.formatOrder < 30; }).sort(function (n1, n2) { return n2.formatOrder - n1.formatOrder; })[0];
        });
    };
    PhotoViewerComponent = __decorate([
        core_1.Component({
            selector: 'photo-viewer',
            templateUrl: './photo-viewer.component.html',
            styleUrls: ['./photo-viewer.component.css']
        })
    ], PhotoViewerComponent);
    return PhotoViewerComponent;
}());
exports.PhotoViewerComponent = PhotoViewerComponent;
//# sourceMappingURL=photo-viewer.component.js.map