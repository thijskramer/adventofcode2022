export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const shapeSynonyms = {
  X: "A", // rock
  Y: "B", // paper
  Z: "C", // scissors
};

const getScoreForBattle = (other: "A" | "B" | "C", me: "A" | "B" | "C") => {
  let score = 0;
  if (me === "A") {
    score += 1;
  }
  if (me === "B") {
    score += 2;
  }
  if (me === "C") {
    score += 3;
  }

  if (other === me) {
    score += 3;
  }
  if (
    (other === "A" && me === "B") ||
    (other === "B" && me === "C") ||
    (other === "C" && me === "A")
  ) {
    score += 6;
  }
  return score;
};

let totalScore = 0;

lines.forEach((line) => {
  const [theOther, me] = line.split(" ");
  const myShape = shapeSynonyms[me as "X" | "Y" | "Z"];
  const score = getScoreForBattle(
    theOther as "A" | "B" | "C",
    myShape as "A" | "B" | "C"
  );
  totalScore += score;
});

console.log(`Answer part 1: ${totalScore}`);
