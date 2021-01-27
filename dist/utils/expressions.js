"use strict";
exports.__esModule = true;
var selectorName = /(-?[_a-zA-Z]+[_\w-]*)/;
var selectorSuffix = /((?=[\s:#.{,>~+[\]]))(?=(?:.|\n|\r)*{)/;
exports["default"] = {
    selectorName: new RegExp(selectorName, "g"),
    classSelector: new RegExp("(\\.|\\[class[\\^\\$\\|\\*]?=)" + selectorName.source + selectorSuffix.source, "gi"),
    idSelector: new RegExp("(#|\\[id[\\^\\$\\|\\*]?=)" + selectorName.source + selectorSuffix.source, "gi"),
    elementAttribute: /(class|id|for|aria-labelledby)\s*=\s*["']([\w\s]+)["']/g,
    idList: /\.(getElementById|id)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g,
    classList: /\.(getElementsByClassName|classList\.add|classList\.remove|classList\.toggle|className)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g
};
