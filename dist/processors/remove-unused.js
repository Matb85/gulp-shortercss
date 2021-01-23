"use strict";
exports.__esModule = true;
function default_1(file, classLibrary) {
    classLibrary.getUnused().forEach(function (selector) {
        var expression = new RegExp("[,?\\s*]\\." + selector + "\\s*{[^}]*}", "g");
        file = file.replace(expression, function (match) {
            if (match[0] !== ",") {
                return "";
            }
            else {
                var subExpression = new RegExp("[,?\\s*]\\." + selector);
                return match.replace(subExpression, function () {
                    return "";
                });
            }
        });
    });
    return file;
}
exports["default"] = default_1;
