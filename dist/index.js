"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const css_terser_1 = __importDefault(require("css-terser"));
const event_stream_1 = require("event-stream");
const gulp_util_1 = __importDefault(require("gulp-util"));
class GulpCssTerser extends css_terser_1.default {
    run() {
        const miniSelectors = (file, callback) => {
            const extensions = file.path.split(".");
            const extension = extensions[extensions.length - 1];
            let reducedFile = String(file.contents);
            for (const binding in this.bindings) {
                if (this.bindings[binding].includes(extension)) {
                    reducedFile = this.processors[binding](reducedFile, this.classLibrary, this.idLibrary);
                }
            }
            file.contents = Buffer.from(reducedFile);
            callback(null, file);
        };
        return event_stream_1.map(miniSelectors);
    }
    info() {
        return event_stream_1.map((file, callback) => {
            gulp_util_1.default.log(file.history[0]);
            gulp_util_1.default.log("Class library:", this.classLibrary.stats());
            gulp_util_1.default.log("ID library:", this.idLibrary.stats());
            callback(null, file);
        });
    }
}
module.exports = {
    GulpCssTerser,
    init(config) {
        return new GulpCssTerser(config);
    },
};
