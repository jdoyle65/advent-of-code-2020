/**
 * @see https://adventofcode.com/2020/day/5
 */
const input = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const passes = input.split('\n').map(pass => parseInput(pass));
// First find the max
const max = passes.reduce((max, { row, column }) => 
  Math.max(max, row * 8 + column)
, 0);
console.log(max); 

// Next, find your seat
const mySeat = findMySeat(passes);
console.log(mySeat);

/**
 * @param {string} input
 * @returns {{ row: number, column: number }}
 */
function parseInput(input) {
  const frontBack = input.slice(0, 7);
  const leftRight = input.slice(7);

  const row = findBinarySpacePartition(
    frontBack.split('').map(r => r === 'F' ? 0 : 1),
    128
  );

  const column = findBinarySpacePartition(
    leftRight.split('').map(r => r === 'L' ? 0 : 1),
    8
  );

  return { row, column };
}

/**
 * @param {0|1} legend 0 for left partition, 1 for right parition
 * @param {number} length 
 * @returns {}
 */
function findBinarySpacePartition(legend, length) {
  const position = legend.reduce((arr, lr) => {
    if (lr === 0) {
      return arr.slice(0, arr.length / 2);
    }

    return arr.slice(arr.length / 2);
  }, (new Array(length)).fill('').map((a,i) => i));

  if (position.length !== 1) {
    throw new Error('Unexpected array length', position);
  }

  return position[0];
}

function findMySeat(passes) {
  const rowMap = new Map();
  passes.forEach(pass => {
    if (!rowMap.has(pass.row)) {
      rowMap.set(pass.row, []);
    }

    rowMap.get(pass.row).push(pass);
  });

  for (let [row, passes] of rowMap.entries()) {
    if (row === 0 || row === 127 || passes.length === 8) {
      continue;
    }

    const missingCol = (new Array(8)).fill('')
      .map((c,i) => i)
      .filter(c => !passes.find(p => p.column === c));

    if (missingCol.length !== 1) {
      throw new Error(`Unexpected missing col length`);
    }
    
    return row * 8 + missingCol[0];
  }
}
