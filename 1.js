/**
 * @see https://adventofcode.com/2020/day/1
 */

const entries = [1721, 979, 366, 299, 675, 1456];

const foundEntries = findEntryTuple(entries, 3, 2020);

if (foundEntries) {
  console.log(foundEntries.reduce((product, num) => product * num, 1));
} else {
  console.log("No such entries found");
}

/**
 * Given an array of numbers "entries", find x number of addends that
 * sum up to the passed "desiredSum"
 *
 * @param {number[]} entries
 * @param {number} addendCount
 * @param {number} [desiredSum=2020]
 *
 * @returns {number[]}
 */
function findEntryTuple(entries, addendCount, desiredSum = 2020) {
  if (addendCount < 2) {
    return [];
  }

  if (addendCount === 2) {
    const addend = entries.find((entry) => {
      const neededEntry = desiredSum - entry;
      return entries.includes(neededEntry);
    });

    if (addend !== undefined) {
      return [addend, desiredSum - addend];
    }

    return null;
  }

  let foundTuple = null;
  const addend = entries.some((entry, index) => {
    const nextDesiredSum = desiredSum - entry;
    const tuple = findEntryTuple(
      [...entries.slice(0, index), ...entries.slice(index + 1)],
      addendCount - 1,
      nextDesiredSum
    );

    if (!tuple) {
      return null;
    }

    foundTuple = [entry, ...tuple];
    return true;
  });

  if (!foundTuple) {
    return null;
  }

  return foundTuple;
}
