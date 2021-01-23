"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var processor_utils_1 = __importDefault(require("./utils/processor-utils"));
var library_1 = __importDefault(require("./utils/library"));
var lodash_1 = require("lodash");
var event_stream_1 = require("event-stream");
var gulp_util_1 = __importDefault(require("gulp-util"));
var processor;
module.exports = {
    run: run,
    minify: run,
    info: info,
    create: create
};
var Processor = (function () {
    function Processor(processors, ignores) {
        this.ignores = lodash_1.extend({ classes: [], ids: [] }, ignores);
        this.processors = processor_utils_1["default"].extendDefaults(processors);
        this.classLibrary = new library_1["default"](this.ignores.classes || []);
        this.idLibrary = new library_1["default"](this.ignores.ids || []);
    }
    Processor.prototype.run = function () {
        var _this = this;
        var miniSelectors = function (file, callback) {
            var extensions = file.path.split(".");
            var extension = extensions[extensions.length - 1];
            var reducedFile = String(file.contents);
            processor_utils_1["default"].getForExtension(_this.processors, extension).forEach(function (processor) {
                console.log(processor);
                reducedFile = processor(reducedFile, _this.classLibrary, _this.idLibrary);
            });
            file.contents = Buffer.from(reducedFile);
            callback(null, file);
        };
        return event_stream_1.map(miniSelectors);
    };
    Processor.prototype.info = function () {
        var _this = this;
        return event_stream_1.map(function (file, callback) {
            gulp_util_1["default"].log(file.history[0]);
            gulp_util_1["default"].log("Class library:", _this.classLibrary.stats());
            gulp_util_1["default"].log("ID library:", _this.idLibrary.stats());
            callback(null, file);
        });
    };
    return Processor;
}());
function run(processors, ignores) {
    console.log(processors);
    processor = new Processor(processors, ignores);
    return processor.run();
}
function info() {
    return processor.info();
}
function create(processors, ignores) {
    return new Processor(processors, ignores);
}
