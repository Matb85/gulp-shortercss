"use strict";
import processorUtils from "./utils/processor-utils";
import Library from "./utils/library";
import { extend } from "lodash";
import { map } from "event-stream";
import utils from "gulp-util";

interface ProcessorI {
  run(): void;
  info(): void;
}
export type ProcessorFunction = (file: string, classLibrary, idLibrary) => string;
export interface AvailableProcessors {
  css: Array<string>;
  html: Array<string>;
  "js-strings": Array<string>;
}

export type Ignores = {
  classes: Array<string>;
  ids: Array<string>;
};
let processor: ProcessorI;

module.exports = {
  run,
  minify: run,
  info,
  create,
};

class Processor implements ProcessorI {
  ignores: Ignores;
  processors: AvailableProcessors;
  classLibrary: any;
  idLibrary: any;
  constructor(processors: AvailableProcessors, ignores: Ignores) {
    this.ignores = extend({ classes: [], ids: [] }, ignores);

    // ensure processor names are set as expected
    this.processors = processorUtils.extendDefaults(processors);

    // build new libraries to use
    this.classLibrary = new Library(this.ignores.classes || []);
    this.idLibrary = new Library(this.ignores.ids || []);
  }

  run() {
    /**
     * Main task for mini selectors uglify classes. Processes files based on type.
     * @param file Stream from es.map
     * @param callback for es.map
     */
    const miniSelectors = (file, callback) => {
      const extensions = file.path.split(".");
      const extension = extensions[extensions.length - 1];
      let reducedFile = String(file.contents);

      processorUtils.getForExtension(this.processors, extension).forEach(processor => {
        console.log(processor);
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

function run(processors: AvailableProcessors, ignores: Ignores) {
  console.log(processors);
  processor = new Processor(processors, ignores);
  return processor.run();
}

function info() {
  return processor.info();
}

function create(processors: AvailableProcessors, ignores: Ignores) {
  return new Processor(processors, ignores);
}
