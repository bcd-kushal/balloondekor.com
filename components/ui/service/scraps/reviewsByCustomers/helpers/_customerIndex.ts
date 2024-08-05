export const hex = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
};

export type hexDigits =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;

export type hexLetters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f";

export const customerBucketIndex = (
  id: string
): number => {
  let slot = 0;
  id.split("").forEach((char, index) => {
    const ascii = char.charCodeAt(0);
    if (ascii <= 57)
      slot =
        (slot +
          index *
            hex[(ascii - 48) as hexDigits]) %
        16;
    else
      slot =
        (slot + index * hex[char as hexLetters]) %
        16;
  });

  return slot;
};

export const customerChainIndex = (
  id: string,
  arrLength: number,
  i: number
): number => {
  let slot = 0;
  id.split("").forEach((char, index) => {
    const ascii = char.charCodeAt(0);
    if (ascii <= 57)
      slot =
        (Math.pow(slot, 2) +
          i * i +
          index *
            hex[(ascii - 48) as hexDigits]) %
        arrLength;
    else
      slot =
        (Math.pow(slot, 2) +
          i * i +
          index * hex[char as hexLetters]) %
        arrLength;
  });

  return slot;
};
