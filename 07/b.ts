import { pathSizes } from "./a.ts";

const diskSize = 70_000_000;

const sizeUsed = pathSizes.get("root") || 0;
const availableSpace = diskSize - sizeUsed;

const sizeToFreeUp = 30_000_000 - availableSpace;

const directoriesQualifiedToDelete = Array.from(pathSizes.values())
  .filter((x) => x > sizeToFreeUp)
  .sort((a, b) => (a < b ? -1 : 1));
console.log("The answer of part 2 is ", directoriesQualifiedToDelete[0]);
