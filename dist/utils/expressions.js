"use strict";
exports.__esModule = true;
var selectorName = "(-?[_a-zA-Z]+[_\\w-]*)";
var selectorSuffix = "((?=[\\s:#\\.\\{,\\>\\~+\\[\\]]))(?=(?:.|\n|\r)*{)";
exports["default"] = {
    selectorName: new RegExp(selectorName, "g"),
    classSelector: new RegExp("(\\.|\\[class[\\^\\$\\|\\*]?=)" + selectorName + selectorSuffix, "gi"),
    idSelector: new RegExp("(#|\\[id[\\^\\$\\|\\*]?=)" + selectorName + selectorSuffix, "gi"),
    elementAttribute: /(class|id|for|aria-labelledby)\s*=\s*["'](-?[_a-zA-Z]+[_\w-\s]*)["']/g,
    idList: /(?:\$|jQuery|(?:\.(?:getElementById|id|jQuery|attr)))\s*[(=]{1}\s*(["']{1}#?-?[_a-zA-Z]+[_\w-]*(?:(?:(?:["']{1}\s*,\s*["']{1})|\s+){1}#?-?[_a-zA-Z]+[_\w-]*)*["']{1})/,
    classList: /(?:\$|jQuery|(?:\.(?:getElementsByClassName|classList\.add|classList\.remove|className|jQuery|addClass|toggleClass|removeClass|attr|hasClass)))\s*[(=]{1}\s*(["']{1}\.?-?[_a-zA-Z]+[_\w-]*(?:(?:(?:["']{1}\s*,\s*["']{1})|\s+){1}\.?-?[_a-zA-Z]+[_\w-]*)*["']{1})/,
    jsString: function (name) {
        return new RegExp("['|\"]" + name + "['|\"]", "g");
    }
};
