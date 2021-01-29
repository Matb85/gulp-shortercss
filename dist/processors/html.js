"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = __importDefault(require("../utils/expressions"));
const js_strings_1 = __importDefault(require("./js-strings"));
const css_1 = __importDefault(require("./css"));
function default_1(file, classLibrary, idLibrary) {
    file = file.replace(/<script>([\s\S]*?)<\/script>/im, function (code) {
        return js_strings_1.default(code, classLibrary, idLibrary);
    });
    file = file.replace(/<style>([\s\S]*?)<\/style>/im, function (code) {
        return css_1.default(code, classLibrary, idLibrary);
    });
    return file.replace(expressions_1.default.elementAttribute, function (attributes) {
        const attribute = attributes.split("=");
        return (attribute[0] +
            "=" +
            attribute[1].replace(expressions_1.default.selectorName, function (selectorName) {
                if (/(id|for)/.test(attribute[0]))
                    return idLibrary.get(selectorName);
                return classLibrary.get(selectorName);
            }));
    });
}
exports.default = default_1;
