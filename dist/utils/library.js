"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const generate_shortname_1 = __importDefault(require("./generate-shortname"));
const multimatch_1 = __importDefault(require("multimatch"));
class Library {
    constructor(ignores) {
        this._library = {};
        this.size = 0;
        this._ignores = ignores;
    }
    has(name) {
        return this._library[name] !== undefined;
    }
    get(name, dontCount = false) {
        let shortname;
        if (this._library[name]) {
            shortname = this._library[name].shortname;
            if (!dontCount) {
                this._library[name].hits++;
            }
        }
        else if (!multimatch_1.default(name, this._ignores).length) {
            do {
                shortname = generate_shortname_1.default(this.size);
                this.size++;
            } while (~this._ignores.indexOf(shortname));
            this._library[name] = {
                shortname: shortname,
                hits: dontCount ? 0 : 1,
            };
        }
        else {
            shortname = name;
        }
        return shortname;
    }
    getAll() {
        return lodash_1.map(this._library, "shortname");
    }
    getUnused() {
        return lodash_1.map(lodash_1.filter(this._library, ({ hits }) => {
            return hits === 0;
        }), "shortname");
    }
    getSize() {
        return this.size;
    }
    getFullNames() {
        return Object.keys(this._library);
    }
    stats() {
        return {
            size: this.getSize(),
            unused: this.getUnused().length,
        };
    }
}
exports.default = Library;
