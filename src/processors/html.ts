import expressions from "../utils/expressions";

/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
export default function(file: string, classLibrary, idLibrary) {
  return file.replace(expressions.elementAttribute, function(attributes) {
    const attribute = attributes.split("=");
    return (
      attribute[0] +
      "=" +
      attribute[1].replace(expressions.selectorName, function(selectorName) {
        switch (attribute[0]) {
          case "id":
          case "for":
            return idLibrary.get(selectorName);
          default:
            // class
            return classLibrary.get(selectorName);
        }
      })
    );
  });
}
