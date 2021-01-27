import expressions from "../utils/expressions";
import { LibraryInstance } from "../utils/library";

/**
 * Dumb search for all strings in all JS files. This will only work on libraries which are fully built.
 * @param {file String}
 * @returns {reducedFile String}
 */
export default function(file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance): string {
  // replacing selectors in js methods that take a singl id ie. getElementById
  file = file.replace(expressions.idList, function(exp) {
    const indexOfQuote = exp.search(/["']/g) + 1;
    const selector = exp.slice(indexOfQuote);
    return exp.slice(0, indexOfQuote) + idLibrary.get(selector);
  });

  // replacing selectors in js methods take in a single classe ie. getElementsByClassName or classList.add
  file = file.replace(expressions.classList, function(exp) {
    const indexOfQuote = exp.search(/["']/g) + 1;
    const selector = exp.slice(indexOfQuote);
    return exp.slice(0, indexOfQuote) + classLibrary.get(selector);
  });

  // replacing selectors in methods that take in both id and classes with prefixes
  file = file.replace(/\.querySelector(All)?\s*?\(\s*?(["'])([#.]?-*_*[\w\s])+/g, function(code) {
    const indexOfQuote = code.search(/["']/g) + 1;
    const selectors = code.slice(indexOfQuote).replace(/[#.](-*_*[\w])+/g, function(selector) {
      if (selector[0] === "#") return "#" + idLibrary.get(selector.slice(1));
      if (selector[0] === ".") return "." + classLibrary.get(selector.slice(1));
      return selector;
    });
    return code.slice(0, indexOfQuote) + selectors;
  });

  return file;
}
