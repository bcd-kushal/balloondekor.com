export const transactionCompletionStatus = (
  index: number,
  pos: number
):
  | "currentlyActive"
  | "completed"
  | "untouched" => {
  if (pos < index) return "completed";
  else if (pos > index) return "untouched";
  return "currentlyActive";
};
