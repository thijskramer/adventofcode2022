const input = await Deno.readTextFile("./input.txt");

const instructions = input.split("\n").map((line) => {
  const [direction, positions] = line.split(" ");
  return {
    direction,
    positions: parseInt(positions),
  };
});

const headPositions = [{ x: 0, y: 0 }];
const tailPositions = [{ x: 0, y: 0 }];

for (const instruction of instructions) {
  for (let i = 0; i < instruction.positions; i++) {
    const lastPosition = headPositions.slice(-1)[0];
    if (instruction.direction === "R") {
      tailPositions.push({ x: lastPosition.x + 1, y: lastPosition.y });
    }
  }
  // if direction changes, tail stays.
}
