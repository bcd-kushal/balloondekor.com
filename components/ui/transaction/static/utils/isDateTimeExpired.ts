import { LineItemDocument } from "@/schemas/cms/lineItem";
import { ServiceDocument } from "@/schemas/cms/service";
import { calculateStartingDate } from "./calculateStartingDate";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { validTimeSlots } from "./validTimeSlots";
import { formattedDateString } from "./formattedDateString";
import moment from "moment";

export function isDateTimeExpired(
  dateString: string,
  contextCartData: Partial<LineItemDocument>[],
  serviceId: string
) {
  const date = moment(dateString, "DD MMM YYYY");
  const today = moment();

  // PAST DATE --------------
  if (date.isBefore(today, "day")) return true;

  // FUTURE DATE --------------
  if (date.isAfter(today, "day")) return false;

  // PRESENT TODAY --------------
  const targetService = contextCartData.filter(
    ({ service }) =>
      serviceId ===
      (service as ServiceDocument)._id
  )[0];

  if (!targetService) return false;

  const timeSlots: TimeSlotDocument[] = (
    (targetService.service as ServiceDocument)
      .deliveryTime.deliverySlots[0]
      .deliveryType as DeliveryTypeDocument
  ).timeSlots;

  const availableTimeSlots = validTimeSlots({
    currDate: formattedDateString(new Date()),
    startDate: calculateStartingDate(
      (
        (targetService.service as ServiceDocument)
          .deliveryTime
          .orderProcessingTime as OrderProcessingTimeDocument
      ).time
    ),
    timeSlots: timeSlots
  });

  return availableTimeSlots.length === 0;
}
