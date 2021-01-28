import { IgnoresType, Processors, Bindings, Config } from "./src/index";
import { LibraryInstance } from "./src/utils/library";

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
