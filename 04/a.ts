export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const getSections = (elf: string) => {
  const [first, last] = elf.split("-").map((x) => parseInt(x));
  const numItems = last - first + 1;
  return Array.from({ length: numItems }, (_, i) => i + first);
};

function isFullyOverlapping(
  firstElfSections: number[],
  lastElfSections: number[]
) {
  const lastContainsFirst = firstElfSections.every((x) =>
    lastElfSections.includes(x)
  );
  const firstContainsLast = lastElfSections.every((x) =>
    firstElfSections.includes(x)
  );
  return lastContainsFirst || firstContainsLast;
}
function isPartiallyOverlapping(
  firstElfSections: number[],
  lastElfSections: number[]
) {
  const lastContainsFirst = firstElfSections.some((x) =>
    lastElfSections.includes(x)
  );
  const firstContainsLast = lastElfSections.some((x) =>
    firstElfSections.includes(x)
  );
  return lastContainsFirst || firstContainsLast;
}

let fullyOverlappingPairs = 0;
let partiallyOverlappingPairs = 0;

lines.filter(Boolean).forEach((line) => {
  const [firstElf, lastElf] = line.split(",");

  const firstElfSections = getSections(firstElf);
  const lastElfSections = getSections(lastElf);

  if (isFullyOverlapping(firstElfSections, lastElfSections)) {
    fullyOverlappingPairs += 1;
  }
  if (isPartiallyOverlapping(firstElfSections, lastElfSections)) {
    partiallyOverlappingPairs += 1;
  }
});

console.log(`Fully overlapping pairs: ${fullyOverlappingPairs}`);
console.log(`Partially overlapping pairs: ${partiallyOverlappingPairs}`);
