"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var library_1 = __importDefault(require("./utils/library"));
var lodash_1 = require("lodash");
var event_stream_1 = require("event-stream");
var gulp_util_1 = __importDefault(require("gulp-util"));
var Plugin = (function () {
    function Plugin(config) {
        if (typeof config === "undefined")
            config = require("./cssterser.config.js");
        if (typeof config === "string")
            config = require(config);
        this.ignores = lodash_1.extend({ classes: [], ids: [] }, config.ignores);
        this.rules = lodash_1.extend({ css: ["css"], html: ["html"] }, config.rules);
        this.processors = config.processors;
        this.classLibrary = new library_1["default"](this.ignores.classes);
        this.idLibrary = new library_1["default"](this.ignores.ids);
    }
    Plugin.prototype.run = function () {
        var _this = this;
        var miniSelectors = function (file, callback) {
            var extensions = file.path.split(".");
            var extension = extensions[extensions.length - 1];
            var reducedFile = String(file.contents);
            for (var rule in _this.rules) {
                console.log("rule: " + rule);
                if (_this.rules[rule].includes(extension)) {
                    console.log(_this.processors);
                    reducedFile = _this.processors[rule](reducedFile, _this.classLibrary, _this.idLibrary);
                }
            }
            file.contents = Buffer.from(reducedFile);
            callback(null, file);
        };
        return event_stream_1.map(miniSelectors);
    };
    Plugin.prototype.info = function () {
        var _this = this;
        return event_stream_1.map(function (file, callback) {
            gulp_util_1["default"].log(file.history[0]);
            gulp_util_1["default"].log("Class library:", _this.classLibrary.stats());
            gulp_util_1["default"].log("ID library:", _this.idLibrary.stats());
            callback(null, file);
        });
    };
    return Plugin;
}());
module.exports = {
    Plugin: Plugin,
    init: function (config) {
        return new Plugin(config);
    }
};
