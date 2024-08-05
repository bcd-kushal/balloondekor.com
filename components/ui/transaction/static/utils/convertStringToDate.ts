import moment from "moment";

export const convertToDate = (
  date: string | Date
): Date => {
  if (
    Object.prototype.toString.call(date) !==
      "[object Date]" &&
    typeof date === "string"
  ) {
    const formattedDate: Date = moment(
      date,
      "DD MMM YYYY"
    ).toDate();
    return formattedDate;
  }

  return date as Date;
};
