import { CityDocument } from "@/schemas/cms/city";

export const getCityName = (
  cityDoc: CityDocument | undefined
): string | null => {
  if (!cityDoc) return null;

  cityDoc = cityDoc as CityDocument;
  return cityDoc.name;
};
