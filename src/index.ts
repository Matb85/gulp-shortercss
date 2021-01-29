"use strict";
import CssTerser from "css-terser";
import { Config } from "css-terser/src/index";
import { map } from "event-stream";
import utils from "gulp-util";

class GulpCssTerser extends CssTerser {
  run() {
    /** Main task for mini selectors uglify classes. Processes files based on type.
     * @param file Stream from es.map
     * @param callback for es.map */
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
  GulpCssTerser,
  init(config: Config): GulpCssTerser {
    return new GulpCssTerser(config);
  },
};
