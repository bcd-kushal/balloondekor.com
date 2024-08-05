import {
  hex,
  hexDigits,
  hexLetters
} from "./_customerIndex";

export const getRandomLocation = (
  id: string,
  i: number,
  cities: string[]
) => {
  let slot = 0;
  const len = cities.length;

  id.split("").forEach((char, index) => {
    const ascii = char.charCodeAt(0);
    if (ascii <= 57)
      slot =
        (Math.pow(slot + i, 3) +
          i * i +
          index *
            i *
            hex[(ascii - 48) as hexDigits]) %
        len;
    else
      slot =
        (Math.pow(slot + i, 3) +
          i * i +
          index * i * hex[char as hexLetters]) %
        len;
  });

  return cities[slot];
};
