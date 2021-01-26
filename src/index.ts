"use strict";
import processorUtils from "./utils/processor-utils";
import Library, { LibraryInstance } from "./utils/library";
import { extend } from "lodash";
import { map } from "event-stream";
import utils from "gulp-util";

export type ProcessorFunction = (file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance) => string;

export interface AvailableProcessors {
  css: Array<string>;
  html: Array<string>;
  "js-strings": Array<string>;
  [key: string]: Array<string>;
}

export type IgnoresType = {
  classes: Array<string>;
  ids: Array<string>;
};

interface PluginI {
  ignores: IgnoresType;
  processors: AvailableProcessors;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  run(): void;
  info(): void;
}

class Plugin implements PluginI {
  ignores: IgnoresType;
  processors: AvailableProcessors;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  constructor(processors: AvailableProcessors, ignores: IgnoresType) {
    this.ignores = extend({ classes: [], ids: [] }, ignores);

    // ensure processor names are set as expected
    this.processors = extend({ css: ["css"], html: ["html"] }, processors);

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

      processorUtils.getForExtension(this.processors, extension).forEach(processor => {
        reducedFile = processor(reducedFile, this.classLibrary, this.idLibrary);
      });
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
  init(processors: AvailableProcessors, ignores: IgnoresType): Plugin {
    return new Plugin(processors, ignores);
  },
};
