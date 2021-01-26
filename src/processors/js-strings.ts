import expressions from "../utils/expressions";
import { LibraryInstance } from "../utils/library";

/**
 * Dumb search for all strings in all JS files. This will only work on libraries which are fully built.
 * @param {file String}
 * @returns {reducedFile String}
 */
export default function(file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance): string {
  // replacing selectors in js methods that take in ids
  file = file.replace(expressions.idList, function(exp) {
    const indexOfQuote = exp.search(/["']/g) + 1;
    const selector = exp.slice(indexOfQuote);
    console.log("id: " + selector);
    return exp.slice(0, indexOfQuote) + idLibrary.get(selector);
  });
  // replacing selectors in js methods take in classes
  file = file.replace(expressions.classList, function(exp) {
    const indexOfQuote = exp.search(/["']/g) + 1;
    const selector = exp.slice(indexOfQuote);
    console.log("class: " + selector);
    return exp.slice(0, indexOfQuote) + classLibrary.get(selector);
  });
  // replacing selectors in methods that take in both id and classes with prefixes

  return file;
}
