const input = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;



const validationRules = {
  byr: { required: true, min: 1920, max: 2002 },
  iyr: { required: true, min: 2010, max: 2020 },
  eyr: { required: true, min: 2020, max: 2030 },
    hgt: { required: true, validate: value => {
      const isHeight = /^(\d+)(cm|in)$/;
      if (!isHeight.test(value)) {
        return false;
      }
      const [, height, unit] = value.match(isHeight);
      if (unit === 'cm') {
        return height >= 150 && height <= 193;
      } else if (unit === 'in') {
        return height >= 59 && height <= 76;
      }

      return false;
    }
  },
  hcl: { required: true, regex: /^#[0-9a-f]{6}$/ },
  ecl: { required: true, regex: /^(amb|blu|brn|gry|grn|hzl|oth)$/ },
  pid: { required: true, regex: /^\d{9}$/ },
  cid: { required: false },
};

const passports = parseInput(input);
const validCount = passports
  .map(passport => validatePassport(passport, validationRules))
  .filter(isValid => !!isValid)
  .length;

console.log(validCount);

/**
 * @param {string} input
 * @returns {any[]}
 */
function parseInput(input) {
  const passportChunks = input.split('\n\n');
  const passportLines = passportChunks.map(passport => passport.split(/(\n|\s)/).filter(item => !!item.trim()));
  return passportLines.map(passportLine => {
    const fields = {};
    passportLine
      .map(line => line.split(':'))
      .forEach(([key, value]) => fields[key] = value);

    return fields;
  });
}

/** 
 * @param {{ [key: string]: any }} passport
 * @param {object} validationRules
 * @returns {boolean} true if valid, false is fails validation
 */
function validatePassport(passport, validationRules) {
  const hasError = Object.entries(validationRules).some(([ruleName, rule]) => {
    if (rule.required && passport[ruleName] === undefined) {
      return true;
    }

    if (rule.validate) {
      return !rule.validate(passport[ruleName]);
    }

    if (typeof rule.min === 'number' && typeof rule.max === 'number') {
      return passport[ruleName] < rule.min || passport[ruleName] > rule.max
    }

    if (rule.regex) {
      return !rule.regex.test(passport[ruleName]);
    }
    
    return false;
  });

  return !hasError;
}