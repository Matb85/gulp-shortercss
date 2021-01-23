import expressions from "../utils/expressions";
/**
 * Replaces all class names with shortnames. Also builds a library of shortnames which can be
 * used to reduce other file types.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
export default function(file: string, classLibrary, idLibrary) {
  const selectorNameMatch = expressions.selectorName;

  file = file.replace(expressions.classSelector, function(selector) {
    // exclude property values (matches ending in ')')
    if (selector[selector.length - 1] === ")") {
      return selector;
    }
    return selector.replace(selectorNameMatch, function(selectorName) {
      return classLibrary.get(selectorName, true);
    });
  });

  file = file.replace(expressions.idSelector, function(selector) {
    // exclude property values (matches ending in '; or }')
    if (selector[selector.length - 1] === ";" || selector[selector.length - 1] === "}") {
      return selector;
    }
    return selector.replace(selectorNameMatch, function(selectorName) {
      return idLibrary.get(selectorName, true);
    });
  });

  return file;
}
