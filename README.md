# Gulp CSS Terser - a Gulp plugin for uglifying/minifying css selectors.

## This project is only a wrapper around (CSS Terser)[https://github.com/Matb85/css-terser]

### More info (here)[https://github.com/Matb85/css-terser]

### Setup

1. First and foremost: `npm i -D gulp-css-terser`

2. Create a cssterser.config.js file and put some options:

```js
// cssterser.config.js

module.exports = {
  /*config*/
};
```

3. In gulpfile.js create a task:

```js
const { src, dest } = require("gulp");
// setting up the plugin: running the init method with a path to the config file as an argument
const Selectors = require("../../dist").init();

exports.yourTask = function() {
  return (
    src(["index.html", "style.css", "script.js"])
      // running
      .pipe(Selectors.run())
      // outputing some info regarding selectors that have been minified - OPTIONAL
      .pipe(Selectors.info())
      .pipe(dest("./dist"))
  );
};
```

by default Css Terser will look at the root of your project for the config file. If you don't like this you can either:

- specify path to the cssterser.config.js if it's in a different directory

```js
const Selectors = require("../../dist").init("path/to/cssterser.config.js");
```

- put your config as a function's argument:

```ts
const Selectors = require("../../dist").init({
  /*config*/
});
```

### Config

see https://github.com/Matb85/css-terser

### Processors

see https://github.com/Matb85/css-terser

#### Creating processors

see https://github.com/Matb85/css-terser

#### Available processors

see https://github.com/Matb85/css-terser

### Contributing

see https://github.com/Matb85/css-terser
