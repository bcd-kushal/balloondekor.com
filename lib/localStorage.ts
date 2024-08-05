export const setLocalStorage = (
  key: string,
  value: any
) => {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
};

export const getLocalStorage = (key: string) => {
  const localData = localStorage.getItem(key);

  if (!localData) {
    return null;
  }

  return JSON.parse(localData);
};

export const deleteLocalStorage = (
  key: string
) => {
  localStorage.removeItem(key);
};
