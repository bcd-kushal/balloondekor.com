import { ServiceDocument } from "@/schemas/cms/service";
import { CartDetailsType } from "../static/types";
import { ContextCartType } from "@/types/frontend/cart";
import { convertToDate } from "../static/utils/convertStringToDate";

export const convertIntoContextCartType = {
  items: (
    cartDetails: CartDetailsType[],
    equivalentServiceDocDetails: ServiceDocument[]
  ): ContextCartType["items"] => {
    /* for every cartDetails... one object adds to the array */
    cartDetails.map((detail) => {
      // find equivalent service
      const filteredEquivServiceDoc =
        equivalentServiceDocDetails.filter(
          ({ _id }) => _id === detail.serviceId
        );

      if (
        filteredEquivServiceDoc &&
        filteredEquivServiceDoc.length
      ) {
        const equivServiceDoc =
          filteredEquivServiceDoc[0];

        // at this point:: cartDetail = detail ... serviceDoc = equivServiceDoc
        const contextCartItem = {
          service: equivServiceDoc,
          quantity: detail.totalUnits,
          eventDate: convertToDate(
            detail.eventDate
          ),
          instruction: detail.instruction,
          decorationTime: {
            type: [],
            timeSlot: []
          },
          addons: []
        };

        return contextCartItem;
      }
    });
    return [];
  },

  checkoutInfo:
    (): ContextCartType["checkoutInfo"] => {
      return {};
    },

  appliedCoupon:
    (): ContextCartType["appliedCoupon"] => {
      return;
    }
};
