import expressions from "../utils/expressions";
import { LibraryInstance } from "../utils/library";
import jsStrings from "./js-strings";
import cssStrings from "./css";
/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
export default function(file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance): string {
  // going through internal css
  file = file.replace(/<script>([\s\S]*?)<\/script>/im, function(code) {
    return jsStrings(code, classLibrary, idLibrary);
  });
  // going through internal css
  file = file.replace(/<style>([\s\S]*?)<\/style>/im, function(code) {
    return cssStrings(code, classLibrary, idLibrary);
  });
  // finally raplacint ids, classes, fors and aria labels
  return file.replace(expressions.elementAttribute, function(attributes) {
    const attribute = attributes.split("=");
    return (
      attribute[0] +
      "=" +
      attribute[1].replace(expressions.selectorName, function(selectorName) {
        if (/(id|for)/.test(attribute[0])) return idLibrary.get(selectorName);
        return classLibrary.get(selectorName);
      })
    );
  });
}
