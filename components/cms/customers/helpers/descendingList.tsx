import { CustomerDocument } from "@/schemas/cms/customer";

export function descendingList(
  arr: CustomerDocument[]
): CustomerDocument[] {
  let reversedList: CustomerDocument[] = [],
    index = 0;
  const len = arr.length;

  for (let i = len - 1; i >= 0; i--) {
    reversedList[index] = arr[i];
    index += 1;
  }

  return reversedList;
}
