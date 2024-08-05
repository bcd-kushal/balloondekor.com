import { CartDetailsType } from "@/components/ui/transaction/static/types";
import { formattedDateString } from "@/components/ui/transaction/static/utils/formattedDateString";
import { AddonDocument } from "@/schemas/cms/addon";
import { CityDocument } from "@/schemas/cms/city";
import { TimeSlotDocument } from "@/schemas/cms/deliveryType";
import { ImageDocument } from "@/schemas/cms/image";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import {
  CustomVariantDocument,
  PriceDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import moment from "moment";
import { isDateTimeExpired } from "./isDateTimeExpired";
import { BLANK_CART_DETAIL_OBJECT } from "../constants";
import { SetStateAction } from "react";
import { maxAdvancePaymentPercentage } from "./maxAdvancePaymentPercentage";

export const LOCALSTORAGE_CART_KEY = "__cart__";
export const EMPTY_SERVICE_ID = "___empty___";

export default function fetchCartFromContext({
  cartDataFromContext,
  currCartDetails,
  selectedCity,
  setAdvancePaymentPercentage,
  setCityWiseServicePrice
}: {
  cartDataFromContext: Partial<LineItemDocument>[];
  currCartDetails: CartDetailsType[];
  selectedCity: string | null;
  setAdvancePaymentPercentage: React.Dispatch<
    SetStateAction<number>
  >;
  setCityWiseServicePrice: React.Dispatch<
    SetStateAction<
      { city: string; price: number }[]
    >
  >;
}): CartDetailsType[] {
  // CONTEXT-CART: not-empty || LOCAL-CART: not-empty  =====================
  if (
    !currCartDetails.length &&
    !cartDataFromContext.length
  )
    return [];
  // CONTEXT-CART: empty     || LOCAL-CART: not-empty ====================
  if (
    currCartDetails.length &&
    !cartDataFromContext.length
  )
    return currCartDetails;

  // CONTEXT-CART: not-empty || LOCAL-CART: empty =====================

  // calculate advance payment percentage //---------------------
  setAdvancePaymentPercentage((prev) =>
    maxAdvancePaymentPercentage({
      contextCartDetails: cartDataFromContext
    })
  );

  return cartDataFromContext
    .map(
      ({
        service,
        quantity,
        eventDate,
        addons,
        instruction,
        decorationTime,
        customVariant
      }) => {
        if (typeof service === "object") {
          service = service as ServiceDocument;
          let targetCustomServiceDoc:
            | CustomVariantDocument
            | undefined = undefined;

          if (customVariant) {
            service.variants.forEach(
              ({ custom: { variants } }) => {
                if (
                  targetCustomServiceDoc ===
                  undefined
                ) {
                  targetCustomServiceDoc =
                    variants.find(
                      ({ _id }) =>
                        _id === customVariant
                    );
                }
              }
            );
          }

          const customServiceDoc:
            | CustomVariantDocument
            | undefined = targetCustomServiceDoc;

          const servicePriceForThatCity: number =
            getCityWisePrice({
              priceDoc: customServiceDoc
                ? ((
                    customServiceDoc as CustomVariantDocument
                  ).price as PriceDocument)
                : (service.price as PriceDocument),
              selectedCity: selectedCity
            });

          const id = service._id;
          setCityWiseServicePrice((prev) => {
            let inPrev = prev.find(
              ({ city }) => city === id
            );

            if (!inPrev) {
              return [
                ...prev,
                {
                  city: id,
                  price: servicePriceForThatCity
                }
              ];
            }

            return prev.map(({ city, price }) =>
              city === id
                ? {
                    city,
                    price: servicePriceForThatCity
                  }
                : { city, price }
            );
          });

          const data: CartDetailsType = {
            customVariant: customServiceDoc
              ? {
                  id: (
                    customServiceDoc as CustomVariantDocument
                  )._id,
                  label: (
                    customServiceDoc as CustomVariantDocument
                  ).label,
                  price: {
                    base: (
                      customServiceDoc as CustomVariantDocument
                    ).price.base.price,
                    cities: (
                      customServiceDoc as CustomVariantDocument
                    ).price.cities.map(
                      ({ price, city }) => ({
                        price,
                        city: (
                          city as CityDocument
                        ).name
                      })
                    )
                  },
                  img: (
                    customServiceDoc as CustomVariantDocument
                  ).image
                    ? {
                        alt: (
                          (
                            customServiceDoc as CustomVariantDocument
                          ).image as ImageDocument
                        ).alt,
                        src: (
                          (
                            customServiceDoc as CustomVariantDocument
                          ).image as ImageDocument
                        ).url
                      }
                    : undefined
                }
              : undefined,
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
            pricePerUnit: servicePriceForThatCity,
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
