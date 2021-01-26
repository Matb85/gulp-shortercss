"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var generate_shortname_1 = __importDefault(require("./generate-shortname"));
var multimatch_1 = __importDefault(require("multimatch"));
var Library = (function () {
    function Library(ignores) {
        this._library = {};
        this.size = 0;
        this._ignores = ignores;
    }
    Library.prototype.has = function (name) {
        return this._library[name] !== undefined;
    };
    Library.prototype.get = function (name, dontCount) {
        if (dontCount === void 0) { dontCount = false; }
        var shortname;
        if (this._library[name]) {
            shortname = this._library[name].shortname;
            if (!dontCount) {
                this._library[name].hits++;
            }
        }
        else if (!multimatch_1["default"](name, this._ignores).length) {
            do {
                shortname = generate_shortname_1["default"](this.size);
                this.size++;
            } while (~this._ignores.indexOf(shortname));
            this._library[name] = {
                shortname: shortname,
                hits: dontCount ? 0 : 1
            };
        }
        else {
            shortname = name;
        }
        return shortname;
    };
    Library.prototype.getAll = function () {
        return lodash_1.map(this._library, "shortname");
    };
    Library.prototype.getUnused = function () {
        return lodash_1.map(lodash_1.filter(this._library, function (_a) {
            var hits = _a.hits;
            return hits === 0;
        }), "shortname");
    };
    Library.prototype.getSize = function () {
        return this.size;
    };
    Library.prototype.getFullNames = function () {
        return Object.keys(this._library);
    };
    Library.prototype.stats = function () {
        return {
            size: this.getSize(),
            unused: this.getUnused().length
        };
    };
    return Library;
}());
exports["default"] = Library;
