import { IgnoresType, Processors, Bindings, Config } from "shortercss/src/index";
import { LibraryInstance } from "shortercss/src/utils/library";

export class CssTerser {
  ignores: IgnoresType;
  processors: Processors;
  bindings: Bindings;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  run();
  constructor(config: Config);
}

export function init(config: Config): CssTerser;
