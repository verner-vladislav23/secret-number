
const isEmpty = (value: string): boolean => {
  if (!value) return false;

  return !Boolean(value.length);
};

const isCorrectPassword = (password: string): boolean => {
  if (!password) return false;

  return password.length > 4;
};

const isCorrectLogin = (login: string): boolean => {
  if (!login) return false;

  if (login.length < 4) return false;

  return /^[-a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-\.]/.test(login);
};

const isCorrectName = (name: string): boolean => (
  /^[A-zА-я]/.test(name)
);

export {
  isCorrectPassword,
  isCorrectLogin,
  isCorrectName,
}
