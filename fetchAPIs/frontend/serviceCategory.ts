// constants
import {
  DOMAIN,
  SERVICE_CATEGORY_API
} from "@/constants/frontend/apiRoute";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export const getServiceCategory = (
  slug: string
): Promise<{
  category: ServiceCategoryDocument | null;
  services: ServiceDocument[];
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SERVICE_CATEGORY_API}/${slug}`;

      const response: Response = await fetch(url);

      const serviceCategory: {
        category: ServiceCategoryDocument | null;
        services: ServiceDocument[];
      } = await response.json();

      if (response.ok) {
        resolve(serviceCategory);
      } else {
        reject(serviceCategory);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Service Category",
        error
      );

      reject({
        category: null,
        services: []
      });
    }
  });
};
