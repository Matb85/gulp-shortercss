"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file, classLibrary) {
    classLibrary.getUnused().forEach(function (selector) {
        const expression = new RegExp("[,?\\s*]\\." + selector + "\\s*{[^}]*}", "g");
        file = file.replace(expression, function (match) {
            if (match[0] !== ",") {
                return "";
            }
            else {
                const subExpression = new RegExp("[,?\\s*]\\." + selector);
                return match.replace(subExpression, function () {
                    return "";
                });
            }
        });
    });
    return file;
}
exports.default = default_1;
