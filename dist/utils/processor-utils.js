"use strict";
exports.__esModule = true;
exports["default"] = { getForExtension: getForExtension };
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
