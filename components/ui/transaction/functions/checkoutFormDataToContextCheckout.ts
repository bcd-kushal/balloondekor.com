import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { CheckoutFormDataType } from "../static/types";
import { CityDocument } from "@/schemas/cms/city";

export const checkoutFormDataToContextCheckout =
  ({
    formData: {
      name,
      email,
      address,
      landmark,
      pincode,
      occasion,
      venue,
      mobile,
      alternateMobile
    },
    cityDoc
  }: {
    formData: CheckoutFormDataType;
    cityDoc: CityDocument;
  }): Partial<CheckoutInfoDocument> => ({
    name: name,
    mobileNumber: mobile,
    alternateMobileNumber: alternateMobile,
    mail: email,
    address: address,
    landmark: landmark,
    pinCode: Number(pincode),
    city: cityDoc,
    occasion: occasion,
    venue: venue
  });
