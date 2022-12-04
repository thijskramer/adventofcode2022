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

const getCorrectResponse = (theOther: string, expected: string) => {
  const resultIndex = "XYZ".split("").indexOf(expected); // [lose / draw  / win ]
  if (resultIndex === 1) {
    return theOther;
  }
  if (resultIndex === 0) {
    if (theOther === "A") {
      return "C";
    }
    if (theOther === "B") {
      return "A";
    }
    return "B";
  }
  if (theOther === "A") {
    return "B";
  }
  if (theOther === "B") {
    return "C";
  }
  return "A";
};

lines.forEach((line) => {
  const [theOther, me] = line.split(" ");
  if (!(theOther && me)) return;
  const myShape = getCorrectResponse(theOther, me);

  const score = getScoreForBattle(
    theOther as "A" | "B" | "C",
    myShape as "A" | "B" | "C"
  );
  console.log(
    `${theOther} vs (${me} should ${
      me === "X" ? "lose" : me === "Y" ? "draw" : "lose"
    } -> ${myShape}) = ${score}`
  );
  totalScore += score;
});

console.log(`Answer part 2: ${totalScore}`);
