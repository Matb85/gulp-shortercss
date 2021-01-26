"use strict";
exports.__esModule = true;
function generateShortname(seed) {
    if (typeof seed === "string")
        throw new Error("Seed must be a number");
    if (seed < 0)
        throw new Error("Seed must be at least 0");
    var library = "abcdefghijklmnopqrstuvwxyz";
    var libraryLength = library.length;
    var prefix = "";
    if (seed >= libraryLength) {
        prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
    }
    return prefix + library[seed % libraryLength];
}
exports["default"] = generateShortname;
