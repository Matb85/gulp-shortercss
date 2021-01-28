# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.1](https://github.com/Matb85/css-terser/compare/v0.4.0...v0.4.1) (2021-01-28)


### Bug Fixes

* add types in the index.d.ts file + npmignore and gitignore update ([f4f151c](https://github.com/Matb85/css-terser/commit/f4f151c139aa86f17d76cdf74a4d3f01de7dd597))
* README typos ([8f043cb](https://github.com/Matb85/css-terser/commit/8f043cbdc90b627655f89198cf0587aab0c36efc))
* README typos + broken links ([e9eb577](https://github.com/Matb85/css-terser/commit/e9eb5779322999fce9ce2c457e6ba46418c877fd))

## [0.4.0](https://github.com/Matb85/css-terser/compare/v0.3.1...v0.4.0) (2021-01-28)


### ⚠ BREAKING CHANGES

* change Regex expressions in src/utils/expression.ts

### Features

* change Regex expressions in src/utils/expression.ts ([9927d4e](https://github.com/Matb85/css-terser/commit/9927d4ea652f08f81e3e41a22c0bde8e7a99ddb4))


### Bug Fixes

* update LICENSE and README ([f4695f1](https://github.com/Matb85/css-terser/commit/f4695f1102113a86e01a12e98ab8b00fc74675c5))

### 0.3.1 (2021-01-27)

### ⚠ BREAKING CHANGES

- remove ./src/utils/processor-utils.ts as its no longer necessary

### Features

- load config from file c145860
- remove ./src/utils/processor-utils.ts as its no longer necessary

### 0.3.0:

- improved the html processor: now it can run through internal js and css
- improved the jsStrings processor: now it can run through querySelector and querySelectorAll methods + it adds selectors to the libraries on its own

### 0.2.0:

- added eslint and typescript
- complete rewrite to typescript
- simplified the project
- changed regexs in expressions: removed JQuery methods;
