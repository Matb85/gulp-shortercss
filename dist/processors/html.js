"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    return file.replace(expressions_1["default"].elementAttribute, function (attributes) {
        var attribute = attributes.split("=");
        return (attribute[0] +
            "=" +
            attribute[1].replace(expressions_1["default"].selectorName, function (selectorName) {
                switch (attribute[0]) {
                    case "id":
                    case "for":
                        return idLibrary.get(selectorName);
                    default:
                        return classLibrary.get(selectorName);
                }
            }));
    });
}
exports["default"] = default_1;
