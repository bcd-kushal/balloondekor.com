import {
  CartDetailsType,
  UpdateAddonsType
} from "@/components/ui/transaction/static/types";
import { formattedDateString } from "@/components/ui/transaction/static/utils/formattedDateString";

export const updateAddons = ({
  serviceId,
  relatedDate,
  newChosenAddonsCartWrapper,
  cartDetails,
  setCartDetails,
  setCartHasUpdate
}: UpdateAddonsType): void => {
  let cartUpdated: boolean = false;

  const targetService:
    | CartDetailsType
    | undefined = cartDetails.filter(
    (detail) =>
      detail.serviceId === serviceId &&
      formattedDateString(detail.eventDate) ===
        relatedDate
  )[0];

  if (targetService) {
    cartUpdated = true;
    setCartDetails((prev) =>
      prev.map((detail) =>
        detail.serviceId ===
          targetService.serviceId &&
        formattedDateString(detail.eventDate) ===
          targetService.eventDate
          ? {
              ...detail,
              addons:
                newChosenAddonsCartWrapper.addons
            }
          : detail
      )
    );
    setCartHasUpdate((prev) => ({
      ...prev,
      cart: true
    }));
  }

  // if (!cartUpdated) {
  //   setCartDetails((prev) => [...prev, data]);
  //   setCartHasUpdate((prev) => true);
  // }
};
