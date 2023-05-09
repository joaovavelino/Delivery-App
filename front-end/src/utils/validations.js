export const loginValidations = (email, password) => {
  const minPasswordLength = 6;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return !(emailRegex.test(email) && password.length >= minPasswordLength);
};

export const registerValidations = (email, password, name) => {
  const minNameLength = 12;
  const result = !(!loginValidations(email, password) && name.length >= minNameLength);
  // console.log('toaki', result);
  return result;
};
