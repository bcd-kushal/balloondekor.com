import { DOMAIN } from "@/constants/frontend/apiRoute";

export const getWhatsappMessaging = ({
  citySelected,
  productName,
  selectedDate,
  selectedTime,
  selectedDeliveryType,
  productPrice,
  cityName,
  currPath
}: {
  citySelected: boolean;
  productName: string;
  selectedDate?: string;
  selectedTime?: string;
  selectedDeliveryType?: string;
  productPrice: string;
  cityName?: string;
  currPath: string;
}): string => {
  const NUMBER = "+918910960060";
  const DOWN_LINK = `${DOMAIN}${currPath}`;

  const cityMsg =
    citySelected && cityName
      ? ` in ${cityName}`
      : "";

  const priceMsg = ` for ₹${productPrice}`;

  const dateMsg = selectedDate
    ? `, done on ${selectedDate}`
    : "";
  const timeMsg =
    dateMsg.length && selectedTime
      ? `, between ${selectedTime}`
      : "";
  const deliveryTypeMsg =
    dateMsg.length &&
    timeMsg.length &&
    selectedDeliveryType
      ? ` via "${selectedDeliveryType}" delivery type`
      : "";
  const deliveryMsg = `${dateMsg}${timeMsg}`;

  const msg = `Hi, I want to book a "${productName}"${cityMsg}${priceMsg}${deliveryMsg}.\n\nThank you\n\n${DOWN_LINK}`;

  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const whatsappContactFromNav =
  (): string => {
    const NUMBER = "+918910960060";
    const msg = `Hey, I have a query`;

    return `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
  };
