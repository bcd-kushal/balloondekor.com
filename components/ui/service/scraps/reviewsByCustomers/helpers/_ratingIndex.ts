import {
  hex,
  hexDigits,
  hexLetters
} from "./_customerIndex";

export const getBadReviewIndex = (
  id: string,
  limit: number
) => {
  let slot = 0;
  id.split("").forEach((char, index) => {
    const ascii = char.charCodeAt(0);
    if (ascii <= 57)
      slot =
        (Math.pow(slot, 2) +
          index *
            hex[(ascii - 48) as hexDigits]) %
        limit;
    else
      slot =
        (Math.pow(slot, 2) +
          index * hex[char as hexLetters]) %
        limit;
  });

  return {
    index: slot,
    badReview: 3 + (slot % 100) / 100
  };
};

export const reviewsHashTable = (
  id: string,
  i: number
) => {
  let slot = 0;
  id.split("").forEach((char, index) => {
    const ascii = char.charCodeAt(0);
    if (ascii <= 57)
      slot =
        ((Math.pow(slot + i, 3) +
          i * i +
          index *
            i *
            hex[(ascii - 48) as hexDigits]) %
          100) /
        100;
    else
      slot =
        ((Math.pow(slot + i, 3) +
          i * i +
          index * i * hex[char as hexLetters]) %
          100) /
        100;
  });

  return 4 + slot;
};
