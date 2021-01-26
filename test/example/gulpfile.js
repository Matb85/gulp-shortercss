const { src, dest } = require("gulp");
const Selectors = require("../../dist").init({
  "js-strings": ["js"],
});

exports.default = function() {
  console.log(Selectors, "\n\n");
  return (
    src(["index.html", "style.css", "script.js"])
      .pipe(Selectors.run())
      // .pipe(Selectors.info())
      .pipe(dest("./dist"))
  );
};
