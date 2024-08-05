import { getCityWisePriceById } from "@/lib/sortServices";
import { AddonDocument } from "@/schemas/cms/addon";
import { ImageDocument } from "@/schemas/cms/image";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { ServiceDocument } from "@/schemas/cms/service";

export const getCartData = ({
  lineItems,
  lineItemId,
  cityId
}: {
  lineItems: LineItemDocument[];
  lineItemId: string;
  cityId: string;
}): {
  serviceName: string;
  serviceImg: { url: string; alt: string };
  service: {
    [key: string]: string;
  }[];
  addons: {
    img: { alt: string; url: string };
    name: string;
    quantity: string;
    price: string;
  }[];
} => {
  const lineItem = lineItems.find(
    ({ _id }) => _id === lineItemId
  ) as LineItemDocument;

  const addons = lineItem.addons;

  return {
    serviceName: (
      lineItem.service as ServiceDocument
    ).name,
    serviceImg: {
      url: (
        (lineItem.service as ServiceDocument)
          .media.primary as ImageDocument
      ).url,
      alt: (
        (lineItem.service as ServiceDocument)
          .media.primary as ImageDocument
      ).alt
    },
    service: [
      {
        label: "Quantity",
        value: `${lineItem.quantity}`
      },
      {
        label: "Price",
        value: `₹ ${lineItem.pricePerUnit || getCityWisePriceById({ cityId, prices: (lineItem.service as ServiceDocument).price })}`
      },
      {
        label: "Addons",
        value: `${addons.length}`
      },
      {
        label: "Instruction",
        value: `${lineItem.instruction || "-"}`
      }
    ],
    addons: addons.map((addon) => ({
      img: {
        alt: (
          (addon.addon as AddonDocument)
            .image as ImageDocument
        ).alt,
        url: (
          (addon.addon as AddonDocument)
            .image as ImageDocument
        ).url
      },
      name: `${(addon.addon as AddonDocument).name}`,
      quantity: `${addon.quantity}`,
      price: `₹ ${(addon.addon as AddonDocument).price}`
    }))
  };
};
