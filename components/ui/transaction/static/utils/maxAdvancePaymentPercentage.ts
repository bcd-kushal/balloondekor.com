import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
import { LineItemDocument } from "@/schemas/cms/lineItem";

export const maxAdvancePaymentPercentage = ({
  contextCartDetails
}: {
  contextCartDetails: Partial<LineItemDocument>[];
}): number => {
  let maxAdvPayPercent: number = 0;
  contextCartDetails.forEach(({ service }) => {
    if (typeof service === "object") {
      service = service as ServiceDocument;
      const localPayPercent: number =
        (
          ((
            service.category as ServiceCategoryDocument
          )
            ?.advancePayment as AdvancePaymentDocument) ||
          0
        )?.value || 0;

      maxAdvPayPercent = Math.max(
        maxAdvPayPercent,
        localPayPercent
      );
    }
  });

  return maxAdvPayPercent;
};

export const maxAdvancePaymentPercentageFromCartDetails =
  ({
    serviceDocs
  }: {
    serviceDocs: ServiceDocument[];
  }): number => {
    let maxAdvPayPercent: number = 0;
    serviceDocs.forEach((service) => {
      if (typeof service === "object") {
        service = service as ServiceDocument;
        const localPayPercent: number =
          (
            ((
              service.category as ServiceCategoryDocument
            )
              ?.advancePayment as AdvancePaymentDocument) ||
            0
          )?.value || 0;

        maxAdvPayPercent = Math.max(
          maxAdvPayPercent,
          localPayPercent
        );
      }
    });

    return maxAdvPayPercent;
  };
