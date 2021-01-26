import { AvailableProcessors, ProcessorFunction } from "../index";
export default { getForExtension };

// getProcessorsForExtension
function getForExtension(processors: AvailableProcessors, extension: string): Array<ProcessorFunction> {
  const selectedProcessors: Array<ProcessorFunction> = [];
  for (const processor in processors) {
    if (typeof processors[processor] === "object" && processors[processor].indexOf(extension) > -1) {
      // check if processor (string) is one of the available processors; if so, it return the chosen processor funtions
      if (/(css|html|js-strings|remove-unused)/.test(processor)) {
        selectedProcessors.push(require("../processors/" + processor).default);
      } else {
        selectedProcessors.push(require(processor).default);
      }
    }
  }

  return selectedProcessors;
}
