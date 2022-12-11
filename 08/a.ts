const input = await Deno.readTextFile("./input.txt");

interface Tree {
  x: number;
  y: number;
  height: number;
}

// create a flat map of all trees with their height and their coordinates.
const trees: Tree[] = input.split("\n").flatMap((row, x) =>
  row.split("").map((value: string, y: number) => ({
    x,
    y,
    height: parseInt(value),
  }))
);

const countVisible = (
  trees: Tree[],
  fromDir: "top" | "left" | "right" | "bottom"
) => {
  const axis = ["left", "right"].includes(fromDir) ? "y" : "x";
  const visible = new Set<Tree>();
  for (const idx of new Set(trees.map((tree) => tree[axis]))) {
    let prevHighest = -1;
    const treesInRow = trees.filter((tree) => tree[axis] === idx);
    if (["right", "bottom"].includes(fromDir)) {
      treesInRow.reverse();
    }
    for (const tree of treesInRow) {
      if (tree.height > prevHighest) {
        prevHighest = tree.height;
        visible.add(tree);
      }
    }
  }
  return visible;
};

const left = countVisible(trees, "left");
const right = countVisible(trees, "right");
const top = countVisible(trees, "top");
const bottom = countVisible(trees, "bottom");

const answer = new Set([...left, ...right, ...top, ...bottom]).size;
console.log("The answer is", answer);
