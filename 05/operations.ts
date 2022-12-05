const input = await Deno.readTextFile("./input.txt");

const [crates, steps] = input.split("\n\n");

const convertCratesToArrays = (crates: string) => {
  const rows = crates.split("\n").reverse();
  const numColumns = rows[1].split(" ").length;
  const columns = Array.from({ length: numColumns }, () => [] as string[]);

  rows.forEach((row) => {
    const parts = row.match(/.{1,4}/g)?.map((x) => x.substring(0, 3));
    parts?.forEach((part, i) => columns[i].push(part));
  });
  return columns.map((col) => col.filter((x) => Boolean(x.trim())));
};

export const runSimulation = (
  moveCrates: (step: string, crateArrays: string[][]) => void
) => {
  const crateArrays = convertCratesToArrays(crates);
  steps.split("\n").forEach((step) => moveCrates(step, crateArrays));

  const topCrates = crateArrays.map((column) => column.findLast((x) => x));
  const answer = topCrates.map((x) => (x ?? "").match(/[A-Z]/)).join("");
  return answer;
};
