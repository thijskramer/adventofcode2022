import { runSimulation } from "./operations.ts";

const executeMoveStepPerCrate = (step: string, crates: string[][]) => {
  const stepNumbers = step.match(/\d+/g) || [];
  let [numCrates, source, destination] = Array.from(stepNumbers, (v, _) =>
    parseInt(v)
  );

  source -= 1;
  destination -= 1;

  for (let i = 0; i < numCrates; i++) {
    const grabbedCrate = crates[source].pop()!;
    crates[destination].push(grabbedCrate);
  }
};

const answer = runSimulation(executeMoveStepPerCrate);

console.log(`The answer: ${answer}`);
