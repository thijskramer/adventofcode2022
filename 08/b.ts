const input = await Deno.readTextFile("./input.txt");

interface Tree {
  x: number;
  y: number;
  height: number;
  scenicScore: number;
}

// create a flat map of all trees with their height and their coordinates.
const trees: Tree[] = input.split("\n").flatMap((row, y) =>
  row.split("").map((value: string, x: number) => ({
    x,
    y,
    height: parseInt(value),
    scenicScore: 0,
  }))
);

const look = (originHeight: number, allTreesInDirection: Tree[]) => {
  const firstTreeNotLower = allTreesInDirection.findIndex(
    (x) => x.height >= originHeight
  );
  if (firstTreeNotLower < 0) {
    return allTreesInDirection.length;
  }
  return 1 + firstTreeNotLower;
};

const lookUp = (tree: Tree) => {
  const { x, y, height } = tree;
  const treesInCol = trees.filter((t) => t.x === x && t.y < y).reverse();
  return look(height, treesInCol);
};

const lookDown = (tree: Tree) => {
  const { x, y, height } = tree;
  const treesInCol = trees.filter((t) => t.x === x && t.y > y);
  return look(height, treesInCol);
};

const lookLeft = (tree: Tree) => {
  const { x, y, height } = tree;
  const treesInRow = trees.filter((t) => t.x < x && t.y === y).reverse();
  return look(height, treesInRow);
};

const lookRight = (tree: Tree) => {
  const { x, y, height } = tree;
  const treesInRow = trees.filter((t) => t.x > x && t.y === y);
  return look(height, treesInRow);
};

trees.forEach((tree) => {
  if (tree.x === 0 || tree.y === 0) {
    return;
  }
  const up = lookUp(tree);
  const down = lookDown(tree);
  const left = lookLeft(tree);
  const right = lookRight(tree);
  tree.scenicScore = up * down * left * right;
});

console.log("maxScore: ", Math.max(...trees.map((x) => x.scenicScore)));
