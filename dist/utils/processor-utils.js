"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
exports["default"] = {
    extendDefaults: extendDefaults,
    getForExtension: getForExtension
};
function extendDefaults(processors) {
    processors = lodash_1.extend({
        css: ["css"],
        html: ["html"]
    }, processors);
    return processors;
}
function getForExtension(processors, extension) {
    var selectedProcessors = [];
    for (var processor in processors) {
        if (typeof processors[processor] === "object" && processors[processor].indexOf(extension) > -1) {
            if (/(css|html|js-strings|remove-unused)/.test(processor)) {
                selectedProcessors.push(require("../processors/" + processor)["default"]);
            }
            else {
                selectedProcessors.push(require(processor)["default"]);
            }
        }
    }
    return selectedProcessors;
}
