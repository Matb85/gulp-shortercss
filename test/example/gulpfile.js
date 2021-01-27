const { src, dest } = require("gulp");
const Selectors = require("../../dist").init(__dirname + "/cssterser.config.js");

exports.default = function() {
  return (
    src(["index.html", "style.css", "script.js"])
      .pipe(Selectors.run())
      // .pipe(Selectors.info())
      .pipe(dest("./dist"))
  );
};
