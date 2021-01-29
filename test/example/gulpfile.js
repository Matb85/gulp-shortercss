const { src, dest } = require("gulp");
// setting up the plugin: running the init methos with a path to the config file as an argument
const CssTerser = require("../../dist").init("/test/example/shortercss.config.js");

exports.default = function() {
  return (
    src(["index.html", "style.css", "script.js"])
      // running
      .pipe(CssTerser.run())
      // outputing some info regarding selectors that have been minified - OPTIONAL
      .pipe(CssTerser.info())
      .pipe(dest("./dist"))
  );
};
