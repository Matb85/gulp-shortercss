const selectorName = /(-?[_a-zA-Z]+[_\w-]*)/;
// const selectorSuffix = /((?=[\s:#.{,>~+[\]]))(?=(?:.|\n|\r)*{)/;
function stylesheetSel(char) {
  return new RegExp(/(?<!:\s*)/.source + char.source + /(-*_*[\w])+(?!(.)*;)/.source, "gi");
}
/**
 * Some awesome expressions that I'll explain in a bit.
 * Test these dope boats live on http://scriptular.com/ to make your life easier.
 */
export default {
  /**
   * Selector name extracts valid selector names from selectors. Basically we use the selector
   * expression to find the selectors, then use this to extract the actual name which need to be
   * shortened.
   *
   * Should match:
   * - selector
   * - -selector
   * - _selector
   * - selector0
   *
   * Shouldn't match:
   * - 3selector
   * - :selector
   */
  selectorName: new RegExp(selectorName, "g"),
  /**
   * Selectors should match any classes and ids defined in a stylesheet.
   *
   * Should match:
   * - #selector
   * - .selector
   * - url('foobar.classname')
   *
   * Shouldn't match:
   * - #e6e6e6;
   * - body
   * - #666
   * - :pseudo
   * - other stupid stuff...I dunno check the tests
   *
   */
  classSelector: stylesheetSel(/\./),
  idSelector: stylesheetSel(/#/),
  /**
   * Matches HTML class, id, and for attributes. I think those are the only ones we care about...
   *
   * NOTE: This expression should also match attributes with spaces between the assignment, e.g.
   *
   * Should match:
   * - class="selector"
   * - class="selector selector"
   * - id="selector"
   * - for="selector"
   *
   * Shouldn't match:
   * - name="selector"
   * - href="selector"
   */
  elementAttribute: /(class|id|for|aria-labelledby)\s*=\s*["'](-*_*[\w\s])+["']/g,
  /**
   * Matches ID Values
   *
   * All values can be single values or lists and lists can be either comma separated (each val is surrounded by single or double quotes OR a space separated list with not internal quotes (only quotes at beginning and end).
   * .getElementById
   * .id
   */
  idList: /\.(getElementById|id)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g,
  /**
   * Matches Class Values
   *
   * All values can be single values or lists and lists can be either comma separated (each val is surrounded by single or double quotes OR a space separated list with not internal quotes (only quotes at beginning and end).
   * .getElementsByClassName
   * .classList.add
   * .classList.remove
   * .classList.toggle
   * .className
   */
  classList: /\.(getElementsByClassName|classList\.add|classList\.remove|classList\.toggle|className)\s*?[(|=]\s*?(["'])(-*_*[\w\s])+/g,
};
