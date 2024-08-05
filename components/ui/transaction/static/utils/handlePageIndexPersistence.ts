import {
  deleteLocalStorage,
  setLocalStorage
} from "@/lib/localStorage";
import { LS_PAGE_INDEX_KEY } from "../../Transaction";

export const handlePageIndexPersistence = ({
  currIndex,
  action
}: {
  currIndex: number;
  action: "forward" | "back";
}) => {
  // payment page ==========================
  if (currIndex === 2) {
    if (action === "back")
      setLocalStorage(LS_PAGE_INDEX_KEY, 1);
    else deleteLocalStorage(LS_PAGE_INDEX_KEY);
  }

  // checkout page ==========================
  if (currIndex === 1) {
    if (action === "back")
      deleteLocalStorage(LS_PAGE_INDEX_KEY);
    else setLocalStorage(LS_PAGE_INDEX_KEY, 1);
  }

  // cart page ==========================
  if (currIndex === 0) {
    if (action === "back")
      deleteLocalStorage(LS_PAGE_INDEX_KEY);
    else setLocalStorage(LS_PAGE_INDEX_KEY, 1);
  }
};
