import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { CartDetailsType } from "../types";
import {
  LineItemAddonDocument,
  LineItemDecorationTimeDocument,
  LineItemDocument
} from "@/schemas/cms/lineItem";
import { convertToDate } from "./convertStringToDate";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { AddonDocument } from "@/schemas/cms/addon";

export const pushCartToContext = ({
  currCartDetails,
  serviceDocs,
  cityWisePrices
}: {
  currCartDetails: CartDetailsType[];
  serviceDocs: ServiceDocument[];
  cityWisePrices: {
    city: string;
    price: number;
  }[];
}): Partial<LineItemDocument>[] =>
  currCartDetails.map(
    ({
      serviceId,
      totalUnits,
      instruction,
      eventTime,
      eventDate,
      addons,
      customVariant
    }) => {
      const relatedServiceDoc =
        serviceDocs.filter(
          ({ _id }) => _id === serviceId
        )[0];

      const deliverySlots = relatedServiceDoc
        .deliveryTime.deliverySlots[0]
        .deliveryType as DeliveryTypeDocument;

      const [serviceStartTime, serviceEndTime] =
        eventTime.trim().split(" - ");

      const contextData: Partial<LineItemDocument> =
        {
          addons: addons.map(
            ({ amount, id, price }) => ({
              quantity: amount,
              addon:
                relatedServiceDoc.addons.filter(
                  ({ addon }) =>
                    (addon as AddonDocument)
                      ._id === id
                )[0]?.addon as AddonDocument,
              pricePerUnit: price
            })
          ) as LineItemAddonDocument[],
          decorationTime: {
            type: deliverySlots,
            timeSlot:
              deliverySlots.timeSlots.filter(
                ({ startTime, endTime }) =>
                  startTime ===
                    serviceStartTime &&
                  endTime === serviceEndTime
              )[0]
          } as LineItemDecorationTimeDocument,
          eventDate: convertToDate(eventDate),
          quantity: totalUnits,
          service: relatedServiceDoc,
          pricePerUnit:
            cityWisePrices.find(
              ({ city }) => city === serviceId
            )?.price || undefined
        };

      const withInstruction: Partial<LineItemDocument> =
        instruction
          ? {
              ...contextData,
              instruction: instruction
            }
          : contextData;

      return customVariant
        ? {
            ...withInstruction,
            customVariant: customVariant.id
          }
        : withInstruction;
    }
  );
