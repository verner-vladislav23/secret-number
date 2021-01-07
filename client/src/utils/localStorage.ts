

export const getToken = (): string | null => {
    const storageTokenKey:string = '@user_t';
    return localStorage.getItem(storageTokenKey);
};

export const setToken = (token: string): void => {
  const storageTokenKey:string = '@user_t';
  localStorage.setItem(storageTokenKey, token);
};
