export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const groups = [];
for (let i = 0; i < lines.length; i += 3) {
  const group = lines.slice(i, i + 3);
  if (group.every((x) => x)) {
    groups.push(group);
  }
}

let sumOfPriorities = 0;

groups.forEach((group) => {
  const [firstLine, secondLine, thirdLine] = group.map((line) =>
    line.split("")
  );
  const badge = firstLine
    .filter((x) => secondLine.includes(x))
    .filter((x) => thirdLine.includes(x))[0];

  // A is charCode 65
  // a is charCode 97

  const offset = badge.toLowerCase() === badge ? 96 : 38;
  const priority = badge.charCodeAt(0) - offset;
  sumOfPriorities += priority;
});

console.log(`The answer: ${sumOfPriorities}`);
