"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateShortname(seed) {
    if (typeof seed === "string")
        throw new Error("Seed must be a number");
    if (seed < 0)
        throw new Error("Seed must be at least 0");
    const library = "abcdefghijklmnopqrstuvwxyz";
    const libraryLength = library.length;
    let prefix = "";
    if (seed >= libraryLength) {
        prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
    }
    return prefix + library[seed % libraryLength];
}
exports.default = generateShortname;
