import { DateTimeType } from "@/components/ui/service/info/Info";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { LineItemDecorationTimeDocument } from "@/schemas/cms/lineItem";
import { ServiceDocument } from "@/schemas/cms/service";

export const getDecorationTime = ({
  dateTime,
  service
}: {
  dateTime: DateTimeType;
  service: ServiceDocument;
}): LineItemDecorationTimeDocument => {
  const availableTimes =
    service.deliveryTime.deliverySlots;

  const chosenSlot = availableTimes.filter(
    ({ deliveryType }) =>
      (deliveryType as DeliveryTypeDocument)
        .name === dateTime.type
  );

  if (chosenSlot && chosenSlot.length) {
    const { deliveryType } = chosenSlot[0];

    const chosenTimeSlotId = (
      (deliveryType as DeliveryTypeDocument)
        .timeSlots as TimeSlotDocument[]
    ).filter(
      ({ startTime, endTime }) =>
        dateTime.startTime === startTime &&
        dateTime.endTime === endTime
    );

    if (
      chosenTimeSlotId &&
      chosenTimeSlotId.length
    )
      return {
        type: deliveryType as DeliveryTypeDocument,
        timeSlot:
          chosenTimeSlotId[0] as TimeSlotDocument
      } as LineItemDecorationTimeDocument;
  }

  return {
    type: "",
    timeSlot: ""
  } as LineItemDecorationTimeDocument;
};
