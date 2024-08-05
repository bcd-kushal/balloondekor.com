export const isValidInput = (str: string) => {
  return str.length > 0 && /\S/.test(str);
};
