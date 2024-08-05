import { EditAddonsType } from "@/components/ui/transaction/static/types";
import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";

export const editAddons = ({
  serviceId,
  relatedDate,
  selectedAddons,
  cartServicesServiceDocumentData,
  setServiceInQuestion,
  setServiceInQuestionsDate,
  setFullAddonsData,
  setShowAddonsDialog,
  setSelectedAddons
}: EditAddonsType) => {
  const filteredData: ServiceDocument[] =
    cartServicesServiceDocumentData.filter(
      ({ _id }) => _id === serviceId
    );

  if (filteredData.length) {
    const serviceDoc: ServiceDocument =
      filteredData[0];
    const allAddons: SelectedAddonDocument[] =
      serviceDoc.addons;
    setServiceInQuestion((prev) => serviceDoc);
    setServiceInQuestionsDate(
      (prev) => relatedDate
    );
    setFullAddonsData((prev) => allAddons);
    setShowAddonsDialog((prev) => true);
    setSelectedAddons((prev) =>
      selectedAddons.map(
        ({ amount, id, price }) => ({
          addonId: id,
          count: amount,
          pricePerUnit: price
        })
      )
    );
  }
};
