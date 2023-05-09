const md5 = require('md5');

const stringMatch = (firstStr, secondStr) => {
  if (firstStr !== secondStr) {
    return false;
  }
  return true;
};

const comparePass = (reqPass, dbPass) => {
  const hashPass = md5(reqPass);
  const compare = stringMatch(hashPass, dbPass);

  return compare;
};

module.exports = {
  comparePass,
};  