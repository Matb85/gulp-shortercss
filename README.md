# Gulp ShorterCSS - a Gulp plugin for shortening/obfuscating css selectors.

## This project is only a wrapper around [ShorterCSS][1]

### More info [here][1]

### Setup

1. First and foremost: `npm i -D gulp-shortercss`

2. Create a cssShortener.config.js file and put some options:

```js
// shortercss.config.js

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

by default Css Shortener will look at the root of your project for the config file. If you don't like this you can either:

- specify path to the shortercss.config.js if it's in a different directory

```js
const Selectors = require("../../dist").init("path/to/shortercss.config.js");
```

- put your config as a function's argument:

```ts
const Selectors = require("../../dist").init({
  /*config*/
});
```

### Config + example

see https://github.com/Matb85/shortercss#config

### Processors

see https://github.com/Matb85/shortercss#processors

#### Creating processors

see https://github.com/Matb85/shortercss#creating-processors

#### Available processors

see https://github.com/Matb85/shortercss#available-processors

### Contributing

see https://github.com/Matb85/shortercss#contributing

[1]: https://github.com/Matb85/shortercss
