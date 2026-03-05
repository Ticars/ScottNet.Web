"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileValidator = /** @class */ (function () {
    function fileValidator() {
    }
    fileValidator.fileRequired = function (abstractControl) {
        console.log(abstractControl);
        if (abstractControl) {
            return null;
        }
        var file = null;
        if (abstractControl.get('file')) {
            var file_1 = abstractControl.get('file').value;
        }
        console.log(JSON.stringify(file));
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