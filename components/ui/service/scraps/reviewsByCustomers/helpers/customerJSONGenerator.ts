export const customerJSONGenerator = (
  str: string
): string => {
  const cleanSurnames = str
    .split("\n")
    .map(
      (surname) =>
        `${surname[0].toUpperCase()}${surname.substring(1, surname.length - 1).toLowerCase()}`
    )
    .filter((surname) => surname.length > 2);

  let buckets: string[][] = [],
    i = 0;

  cleanSurnames.forEach((surname) => {
    if (i >= buckets.length)
      buckets[i] = [surname];
    else buckets[i].push(surname);

    i = (i + 1) % 16;
  });

  return JSON.stringify(buckets).replace(
    "'",
    '"'
  );
};
