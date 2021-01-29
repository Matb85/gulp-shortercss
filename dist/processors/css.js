"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    const selectorNameMatch = expressions_1.default.selectorName;
    file = file.replace(expressions_1.default.classSelector, function (selector) {
        return selector.replace(selectorNameMatch, function (selectorName) {
            return classLibrary.get(selectorName, true);
        });
    });
    file = file.replace(expressions_1.default.idSelector, function (selector) {
        return selector.replace(selectorNameMatch, function (selectorName) {
            return idLibrary.get(selectorName, true);
        });
    });
    return file;
}
exports.default = default_1;
