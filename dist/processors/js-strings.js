"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    classLibrary.getFullNames().forEach(function (selector) {
        file = file.replace(expressions_1["default"].jsString(selector), function () {
            return "'" + classLibrary.get(selector) + "'";
        });
    });
    idLibrary.getFullNames().forEach(function (selector) {
        file = file.replace(expressions_1["default"].jsString(selector), function () {
            return "'" + idLibrary.get(selector) + "'";
        });
    });
    return file;
}
exports["default"] = default_1;
