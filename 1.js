/**
 * @see https://adventofcode.com/2020/day/1
 */

const entries = [1721, 979, 366, 299, 675, 1456];

/**
 * Find a pair of numbers in the `entries` array, such that
 * the sum of those two numbers is 2020
 * 
 * @param {number[]} entries
 * @returns {[number, number]} 
 */
function findEntryPair(entries) {
  const entry = entries.find(entry => {
    const neededEntry = 2020 - entry;
    return entries.includes(neededEntry);
  });

  if (entry !== undefined) {
    return [entry, 2020 - entry];
  }

  return null;
}

const foundEntries = findEntryPair(entries);

if (foundEntries) {
  console.log(foundEntries[0] * foundEntries[1]);
} else {
  console.log('No such entries found');
}