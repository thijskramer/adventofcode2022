export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

const sumOfValues = (calories: string) => {
  const items = calories.split("\n").map((x) => (x ? parseInt(x) : 0));
  return items.reduce((a, b) => a + b, 0);
};

const caloriesPerElf = lines.map((elf) => sumOfValues(elf));

const largestCalorieIntake = Math.max(...caloriesPerElf);

console.log(`Answer Part 1: ${largestCalorieIntake}`);

const sortedCalories = caloriesPerElf.sort((a, b) => (a < b ? 1 : -1));
const topThree = sortedCalories.slice(0, 3);

const topThreeIntake = topThree.reduce((a, b) => a + b, 0);

console.log(`Answer Part 2: ${topThreeIntake}`);
