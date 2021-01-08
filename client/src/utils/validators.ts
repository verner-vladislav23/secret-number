
const isCorrectName = (name: string): boolean => (
  /^[A-zА-я]/.test(name)
);

const isCorrectLogin = (login: string): boolean => (
  /^[-a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-\.]/.test(login)
);

const isCorrectPassword = (password: string): boolean => {
  if (!password) return false;

  return password.length > 4;
};

export {
  isCorrectName,
  isCorrectPassword,
  isCorrectLogin
}
