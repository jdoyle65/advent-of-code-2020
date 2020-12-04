/**
 * @see https://adventofcode.com/2020/day/3
 */

const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

const lines = input.split('\n').map(line => line.trim());
const lineWidth = lines[0].length;

const treeCounts = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
].map(([x, y]) => traverseWithSlope(x, y, lines, lineWidth));

console.log(treeCounts);

const treeCountProduct = treeCounts.reduce((product, count) => count * product, 1);

console.log(treeCountProduct);


function getMapChar(lines, lineWidth, x, y) {
  const newX = x % lineWidth;
  const newY = y % lines.length;

  return lines[newY][newX];
}

function traverseWithSlope(xDelta, yDelta, lines, lineWidth) {
  let x = 0, y = 0, treeCount = 0;

  while(y < lines.length) {
    if (getMapChar(lines, lineWidth, x, y) === '#') {
      treeCount++;
    }

    x += xDelta;
    y += yDelta;
  }

  return treeCount;
}