/**
 * Helper function for generating shortnames based on an alphabetic library.
 *
 * @param seed Integer
 * @returns {string Shortname}
 */
export default function generateShortname(seed) {
  if (seed !== parseInt(seed, 10)) throw new Error("Seed must be a number");
  if (seed < 0) throw new Error("Seed must be at least 0");

  const library = "abcdefghijklmnopqrstuvwxyz";
  const libraryLength = library.length;
  let prefix: string = "";
  // break the seed down if it is larger than the library
  if (seed >= libraryLength) {
    prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
  }
  // return the prefixed shortname
  return prefix + library[seed % libraryLength];
}
