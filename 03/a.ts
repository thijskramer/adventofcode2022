export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let sumOfPriorities = 0;

lines.forEach((line) => {
  if (line.length === 0) {
    return;
  }
  const firstCompartment = line.slice(0, line.length / 2).split("");
  const secondCompartment = line.slice(line.length / 2).split("");

  const itemType = firstCompartment.filter((x) =>
    secondCompartment.includes(x)
  )[0];

  // A is charCode 65
  // a is charCode 97

  const offset = itemType.toLowerCase() === itemType ? 96 : 38;
  const priority = itemType.charCodeAt(0) - offset;
  sumOfPriorities += priority;
});

console.log(`The answer: ${sumOfPriorities}`);
