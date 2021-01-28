const html = require("../../dist/processors/html.js").default;
const css = require("../../dist/processors/css.js").default;
const jsStrings = require("../../dist/processors/js-strings.js").default;

module.exports = {
  processors: {
    html,
    css,
    jsStrings,
  },
  bindings: {
    html: ["html"],
    css: ["css"],
    jsStrings: ["js"],
  },
  ignores: {
    classes: ["review", "lazy-load", "dot", "curdot", "nextdot", "gpart", "stop"],
    ids: ["opinions", "prev", "next", "pagination"],
  },
};
