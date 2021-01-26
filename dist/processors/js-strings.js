"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    file = file.replace(expressions_1["default"].idList, function (exp) {
        var indexOfQuote = exp.search(/["']/g) + 1;
        var selector = exp.slice(indexOfQuote);
        console.log("id: " + selector);
        return exp.slice(0, indexOfQuote) + idLibrary.get(selector);
    });
    file = file.replace(expressions_1["default"].classList, function (exp) {
        var indexOfQuote = exp.search(/["']/g) + 1;
        var selector = exp.slice(indexOfQuote);
        console.log("class: " + selector);
        return exp.slice(0, indexOfQuote) + classLibrary.get(selector);
    });
    return file;
}
exports["default"] = default_1;
