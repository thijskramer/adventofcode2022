const input = await Deno.readTextFile("./input.txt");

const chars = input.split("");

let index = 0;
while (true) {
  const slice = chars.slice(index, index + 4);
  if (new Set(slice).size === slice.length) {
    console.log("The answer is: ", index + 4);
    break;
  }
  index += 1;
}
