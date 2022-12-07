const input = await Deno.readTextFile("./input.txt");

const pathSizes = new Map<string, number>();

let command = "";
let cwd = "/";

const updateSizeOfPath = (cwd: string, sizeStr: string) => {
  const size = parseInt(sizeStr);
  const segments = cwd.split("/");
  for (let i = 0; i < segments.length; i++) {
    const pathKey = segments.slice(0, i + 1).join("/");
    const existingSize = pathSizes.get(pathKey) || 0;
    pathSizes.set(pathKey, existingSize + size);
  }
};

const cd = (cwd: string, lastCommand: string) => {
  const arg = lastCommand.split(" ")[1];
  if (arg === "/") {
    return "root";
  }
  if (arg === "..") {
    if (cwd === "root") {
      return cwd;
    }
    return cwd.substring(0, cwd.lastIndexOf("/"));
  }
  return `${cwd}/${arg}`;
};

for (const line of input.split("\n")) {
  if (line.startsWith("$")) {
    command = line.substring(2);
    if (command.startsWith("cd")) {
      cwd = cd(cwd, command);
      continue;
    }
  }
  if (command.startsWith("ls")) {
    const dirOrSize = line.split(" ")[0];
    if (dirOrSize === "dir") {
      continue;
    }
    if (/^\d+$/.test(dirOrSize)) {
      updateSizeOfPath(cwd, dirOrSize);
    }
  }
}

let result = 0;
pathSizes.forEach((val) => {
  if (val <= 100000) {
    result += val;
  }
});

export { pathSizes };

console.log("The answer of part 1 is ", result);
