import { map, filter } from "lodash";
import generateShortname from "./generate-shortname";
import multimatch from "multimatch";
/**
 * This handy function returns an empty library. This should be a module on its own so that the
 * logic of retrieving a library does not get mixed up with the library logic itself.
 * @returns {object} Library
 * @constructor
 */
type LibraryType = {
  [key: string]: {
    shortname: string;
    hits: number;
  };
};
export interface LibraryInstance {
  _library: LibraryType;
  _ignores: Array<string>;
  size: number;
  has(name: string): boolean;
  get(name: string, dontCount?: boolean): string;
  getAll(): Array<string>;
  getUnused(): Array<string>;
  getSize(): number;
  getFullNames(): Array<string>;
  stats(): { size: number; unused: number };
}

export default class Library implements LibraryInstance {
  _library: LibraryType = {};
  _ignores: Array<string>;
  size = 0;
  constructor(ignores: Array<string>) {
    this._ignores = ignores;
  }

  /** Tests if a value exists in the library. @params {string} name; @returns {boolean} if it exists */
  has(name: string): boolean {
    return this._library[name] !== undefined;
  }

  /**
   * Ensures the name is set and returns it. If generates an ignored name,
   * will increase size and try again
   * @param name String name to get shortname for from the library
   * @param dontCount Bool to not to count this as a use in the code
   * @returns {string} Shortname of the minified name
   */
  get(name: string, dontCount: boolean = false): string {
    // catch all for ignoring IDs
    // if (this._ignores === true) return name;

    let shortname;

    if (this._library[name]) {
      shortname = this._library[name].shortname;
      if (!dontCount) {
        this._library[name].hits++;
      }
    } else if (!multimatch(name, this._ignores).length) {
      do {
        shortname = generateShortname(this.size);
        this.size++;
      } while (~this._ignores.indexOf(shortname));

      this._library[name] = {
        shortname: shortname,
        hits: dontCount ? 0 : 1,
      };
    } else {
      shortname = name;
    }

    return shortname;
  }

  /** @returns {array} Of all shortnames in the library. Does not count towards usage. */
  getAll(): Array<string> {
    return map(this._library, "shortname");
  }

  /** Retrieves shortnames which are not used in the code processed. @returns {array} Of unused names */
  getUnused(): Array<string> {
    return map(
      filter(this._library, ({ hits }) => {
        return hits === 0;
      }),
      "shortname"
    );
  }

  /** @returns {number} Number of entries in the library */
  getSize(): number {
    return this.size;
  }

  /** @returns {Array} All full selector names which have been entered so far */
  getFullNames(): Array<string> {
    return Object.keys(this._library);
  }

  stats() {
    return {
      size: this.getSize(),
      unused: this.getUnused().length,
    };
  }
}
