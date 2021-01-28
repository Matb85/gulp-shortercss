# CSS Terser - a Gulp plugin for tersing/minifying css selectors' names, written in Typescript.

# This project is based on [gulp-selectors](https://github.com/cazzer/gulp-selectors/)

> Minify those pesky selector names down to nothing with this fancy gulp plugin. Minified selectors will be applied consistently across all files piped into it.

| Input                                               | Output                                 |
| --------------------------------------------------- | -------------------------------------- |
| `.class-name { ... }`                               | `.a { ... }`                           |
| `.another-class { ... }`                            | `.b { ... }`                           |
| `#an-id { ... }`                                    | `#a { ... }`                           |
| `<div class="class-name"> ... </div>`               | `<div class="a"> ... </div>`           |
| `document.getElementById("an-id")`                  | `document.getElementById("a")`         |
| `document.querySelectorAll("#an-id > .class-name")` | `document.querySelectorAll("#a > .a")` |

_You're like: `.some-super-descriptive-selector-name {...}`, and it's like: `.a {...}`_

## Setup

1. First and foremost: `npm i -D gulp-selectors`

2. Create a Gulp task:

```js
const { src, dest } = require("gulp");
// setting up the plugin: running the init methos with a path to the config file as an argument
const Selectors = require("../../dist").init("/test/example/cssterser.config.js");

exports.default = function() {
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

3. add some options. You can put them in one of these places:

- cssterser.config.js at the root of your project.
- directly as argument in the init method

### options

Sure, the plugin is fully configurable. Here's the scheme:

```js
// cssterser.config.js

// first import the processors - html, css and js-strings are built-in
const html = require("css-terser/dist/processors/html.js").default;
const css = require("css-terser/dist/processors/css.js").default;
const jsStrings = require("css-terser/dist/processors/js-strings.js").default;
const yourProcessor = require("path/to/your/processor");
module.exports = {
  // put the processors here
  processors: {
    html,
    css,
    jsStrings,
    yourProcessor,
  },
  // set bindings - assign file extensions to the processors specified above
  bindings: {
    html: ["html", "pug"],
    css: ["css"],
    jsStrings: ["js"],
    yourProcessor: ["vue", "jsx"],
  },
  // put heree classes and ids that you don't want to be minified
  ignores: {
    classes: ["class", "another_class"],
    ids: ["id", "another-id"],
  },
};
```

### Processors

CSS Terser relies on processors. Processors a basicly functions that follow the sheme below:

```ts
function(file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance): string {
  // your beutiful code
  return TersedFile
};
```

**LibraryInstance** is an istance of the Library class:

```ts
interface LibraryInstance {
  _library: LibraryType;
  _ignores: Array<string>;
  size: number;
  has(name: string): boolean;
  get(name: string, dontCount?: boolean): string; // use this to get a shortname of a class or id
  getAll(): Array<string>;
  getUnused(): Array<string>;
  getSize(): number;
  getFullNames(): Array<string>;
  stats(): { size: number; unused: number };
}
```

Still not sure? Jump into the project's src folder, or raise an issue!

#### Creating processors

Of course you don't have to rely on the built-in processors. Just create a funtion like the one above and put it in the config.

#### Available processors

##### Regex-based:

- html (built-in)
- css (built-in)
- jsStrings (built-in)

**Have you created a processor? Share it with us**:smiley:

### Contributing

Sure, if you think you can improve this project, go ahead! But, just three little things:

- use (typescript)[https://www.typescriptlang.org/]
- follow ESlint's suggestions
- follow (Conventional Commit's specification)[https://www.conventionalcommits.org/en/v1.0.0/]
