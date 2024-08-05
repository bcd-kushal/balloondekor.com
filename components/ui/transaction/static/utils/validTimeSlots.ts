import { TimeSlotDocument } from "@/schemas/cms/deliveryType";
import moment from "moment";

export const validTimeSlots = ({
  startDate,
  currDate,
  timeSlots
}: {
  startDate: Date;
  currDate: string | Date;
  timeSlots: TimeSlotDocument[];
}): TimeSlotDocument[] => {
  if (
    Object.prototype.toString.call(currDate) !==
      "[object Date]" &&
    typeof currDate === "string"
  )
    currDate = moment(
      currDate,
      "DD MMM YYYY"
    ).toDate();

  const fallsInSameDay: boolean =
    startDate.getDate() ===
      (currDate as Date).getDate() &&
    startDate.getMonth() ===
      (currDate as Date).getMonth() &&
    startDate.getFullYear() ===
      (currDate as Date).getFullYear();

  if (fallsInSameDay) {
    const minHrs = startDate.getHours();
    const validSlots = timeSlots.filter(
      ({ startTime }) =>
        parseInt(startTime.substring(0, 2)) >
        minHrs
    );
    return validSlots;
  }

  return timeSlots;
};
