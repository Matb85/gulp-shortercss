"use strict";
// import processorUtils from "./utils/processor-utils";
import Library, { LibraryInstance } from "./utils/library";
import { extend } from "lodash";
import { map } from "event-stream";
import utils from "gulp-util";

export type ProcessorFunction = (file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance) => string;

export interface Rules {
  [key: string]: Array<string>;
}
export interface Processors {
  [key: string]: Function;
}
export type IgnoresType = {
  classes: Array<string>;
  ids: Array<string>;
};

class Plugin {
  ignores: IgnoresType;
  processors: Processors;
  rules: Rules;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  constructor(config: { processors: Processors; rules: Rules; ignores: IgnoresType }) {
    if (typeof config === "undefined") config = require("./cssterser.config.js");
    if (typeof config === "string") config = require(config);

    // ensure processor names are set as expected
    this.ignores = extend({ classes: [], ids: [] }, config.ignores);
    this.rules = extend({ css: ["css"], html: ["html"] }, config.rules);
    this.processors = config.processors;
    // build new libraries to use
    this.classLibrary = new Library(this.ignores.classes);
    this.idLibrary = new Library(this.ignores.ids);
  }

  run() {
    /** Main task for mini selectors uglify classes. Processes files based on type.
     * @param file Stream from es.map
     * @param callback for es.map */
    const miniSelectors = (file, callback) => {
      const extensions = file.path.split(".");
      const extension = extensions[extensions.length - 1];
      let reducedFile = String(file.contents);

      for (const rule in this.rules) {
        console.log("rule: " + rule);
        if (this.rules[rule].includes(extension)) {
          console.log(this.processors);
          reducedFile = this.processors[rule](reducedFile, this.classLibrary, this.idLibrary);
        }
      }
      file.contents = Buffer.from(reducedFile);
      callback(null, file);
    };

    return map(miniSelectors);
  }

  info() {
    return map((file, callback) => {
      utils.log(file.history[0]);
      utils.log("Class library:", this.classLibrary.stats());
      utils.log("ID library:", this.idLibrary.stats());
      callback(null, file);
    });
  }
}

module.exports = {
  Plugin,
  init(config): Plugin {
    return new Plugin(config);
  },
};
