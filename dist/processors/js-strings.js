"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    file = file.replace(expressions_1.default.idList, function (exp) {
        const indexOfQuote = exp.search(/["']/g) + 1;
        const selector = exp.slice(indexOfQuote);
        return exp.slice(0, indexOfQuote) + idLibrary.get(selector);
    });
    file = file.replace(expressions_1.default.classList, function (exp) {
        const indexOfQuote = exp.search(/["']/g) + 1;
        const selector = exp.slice(indexOfQuote);
        return exp.slice(0, indexOfQuote) + classLibrary.get(selector);
    });
    file = file.replace(/\.querySelector(All)?\s*?\(\s*?(["'])([#.]?-*_*[\w\s])+/g, function (code) {
        const indexOfQuote = code.search(/["']/g) + 1;
        const selectors = code.slice(indexOfQuote).replace(/[#.](-*_*[\w])+/g, function (selector) {
            if (selector[0] === "#")
                return "#" + idLibrary.get(selector.slice(1));
            if (selector[0] === ".")
                return "." + classLibrary.get(selector.slice(1));
            return selector;
        });
        return code.slice(0, indexOfQuote) + selectors;
    });
    return file;
}
exports.default = default_1;
