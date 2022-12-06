const input = await Deno.readTextFile("./input.txt");

const chars = input.split("");

let index = 0;
const markerLength = 14;
while (true) {
  const slice = chars.slice(index, index + markerLength);
  if (new Set(slice).size === slice.length) {
    console.log("The answer is: ", index + markerLength);
    break;
  }
  index += 1;
}
