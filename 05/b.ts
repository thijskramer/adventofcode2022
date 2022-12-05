import { runSimulation } from "./operations.ts";

const executeMoveStepPerStack = (step: string, crates: string[][]) => {
  const stepNumbers = step.match(/\d+/g);
  if (!stepNumbers?.length) {
    return;
  }
  let [numCrates, source, destination] = Array.from(stepNumbers, (v, _) =>
    parseInt(v)
  );

  source -= 1;
  destination -= 1;
  const grabbedCrates = crates[source].splice(
    crates[source].length - numCrates
  );
  crates[destination].push(...grabbedCrates);
};

const answer = runSimulation(executeMoveStepPerStack);

console.log(`The answer: ${answer}`);
