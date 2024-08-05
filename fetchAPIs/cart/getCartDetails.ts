import { CartDetailsType } from "@/components/ui/transaction/static/types";
import { calculateStartingDate } from "@/components/ui/transaction/static/utils/calculateStartingDate";
import { formattedDateString } from "@/components/ui/transaction/static/utils/formattedDateString";
import { validTimeSlots } from "@/components/ui/transaction/static/utils/validTimeSlots";
import { AddonDocument } from "@/schemas/cms/addon";
import { CityDocument } from "@/schemas/cms/city";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { ImageDocument } from "@/schemas/cms/image";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import {
  PriceDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import moment from "moment";

export const LOCALSTORAGE_CART_KEY = "__cart__";
export const EMPTY_SERVICE_ID = "___empty___";

const BLANK_CART_DETAIL_OBJECT = {
  serviceId: EMPTY_SERVICE_ID,
  serviceName: "",
  serviceImage: {
    alt: "",
    url: ""
  },
  pricePerUnit: 0,
  totalUnits: 0,
  eventDate: new Date(),
  eventTime: ``,
  instruction: undefined,
  addons: []
};

function isDateTimeExpired(
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

export default function getCartDetails(
  cartDataFromContext: Partial<LineItemDocument>[],
  currCartDetails: CartDetailsType[],
  selectedCity: string | null
): CartDetailsType[] {
  // context-cart: not-empty & cartDetails: not-empty  =====================
  if (
    !currCartDetails.length &&
    !cartDataFromContext.length
  )
    return [];
  // context-cart: empty & cartDetails: not-empty ====================
  if (
    currCartDetails.length &&
    !cartDataFromContext.length
  )
    return currCartDetails;

  // context-cart: not-empty & cartDetails: empty =====================
  return cartDataFromContext
    .map(
      ({
        service,
        quantity,
        eventDate,
        addons,
        instruction,
        decorationTime
      }) => {
        if (typeof service === "object") {
          service = service as ServiceDocument;
          const data: CartDetailsType = {
            serviceId: service._id,
            serviceName: service.name,
            serviceImage: {
              alt: (
                service.media
                  .primary as ImageDocument
              ).alt,
              url: (
                service.media
                  .primary as ImageDocument
              ).url
            },
            pricePerUnit: getCityWisePrice({
              priceDoc:
                service.price as PriceDocument,
              selectedCity: selectedCity
            }),
            totalUnits: quantity || 0,
            eventDate: moment(
              eventDate || new Date()
            ).format("DD MMM YYYY"),
            eventTime: `${(decorationTime?.timeSlot as TimeSlotDocument).startTime} - ${(decorationTime?.timeSlot as TimeSlotDocument).endTime}`,
            instruction: instruction,
            addons:
              addons?.map(
                ({ addon, quantity }) => ({
                  label: (addon as AddonDocument)
                    .name,
                  price: (addon as AddonDocument)
                    .price,
                  amount: quantity,
                  image: {
                    url: (
                      (addon as AddonDocument)
                        .image as ImageDocument
                    ).url,
                    alt: (
                      (addon as AddonDocument)
                        .image as ImageDocument
                    ).alt
                  },
                  id: (addon as AddonDocument)._id
                })
              ) || []
          };
          return data;
        }
        return BLANK_CART_DETAIL_OBJECT;
      }
    )
    .filter(
      ({ serviceId, eventDate, eventTime }) =>
        serviceId !== EMPTY_SERVICE_ID &&
        !isDateTimeExpired(
          formattedDateString(eventDate),
          cartDataFromContext,
          serviceId
        )
    );

  // context-cart: not-empty & cartDetails: not-empty =====================
}

function getCityWisePrice({
  priceDoc,
  selectedCity
}: {
  priceDoc: PriceDocument;
  selectedCity: string | null;
}): number {
  if (selectedCity === null)
    return priceDoc.base.price;

  const cityPriceList = priceDoc.cities
    .filter(({ city }) => {
      if (
        typeof city === "object" &&
        Object.keys(city).length
      ) {
        return (
          (
            city as CityDocument
          ).name.toLowerCase() ===
          selectedCity.toLowerCase()
        );
      }
      return false;
    })
    .map(({ price }) => price);

  if (cityPriceList.length)
    return cityPriceList[0];

  return priceDoc.base.price;
}
