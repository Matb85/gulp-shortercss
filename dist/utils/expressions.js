"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selectorName = /(-?[_a-zA-Z]+[_\w-]*)/;
function stylesheetSel(char) {
    return new RegExp(/(?<!:\s*)/.source + char.source + /(-*_*[\w])+(?!(.)*;)/.source, "gi");
}
exports.default = {
    selectorName: new RegExp(selectorName, "g"),
    classSelector: stylesheetSel(/\./),
    idSelector: stylesheetSel(/#/),
    elementAttribute: /(class|id|for|aria-labelledby)\s*=\s*["'](-*_*[\w\s])+["']/g,
    idList: /\.(getElementById|id)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g,
    classList: /\.(getElementsByClassName|classList\.add|classList\.remove|classList\.toggle|className)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g,
};
