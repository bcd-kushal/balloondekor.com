import moment from "moment";

export const formattedDateString = (
  date: string | Date
) => {
  if (typeof date === "object")
    return moment(date as Date).format(
      "DD MMM YYYY"
    );
  return date;
};
