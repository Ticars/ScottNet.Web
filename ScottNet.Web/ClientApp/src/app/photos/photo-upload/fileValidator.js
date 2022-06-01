"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileValidator = /** @class */ (function () {
    function fileValidator() {
    }
    fileValidator.fileRequired = function (abstractControl) {
        var file = abstractControl.get('file').value;
        console.log(JSON.stringify(file));
        alert(JSON.stringify(file));
        if (file == null) {
            abstractControl.get('file').setErrors({
                NoFile: true
            });
        }
        else {
            return null;
        }
    };
    return fileValidator;
}());
exports.fileValidator = fileValidator;
//# sourceMappingURL=fileValidator.js.map