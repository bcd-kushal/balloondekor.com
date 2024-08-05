// constants
import {
  DOMAIN,
  SERVICE_API
} from "@/constants/frontend/apiRoute";

// types
import { ServiceDocument } from "@/schemas/cms/service";

export const getServiceData = (
  serviceSlug: string
): Promise<{
  service: ServiceDocument | null;
  suggestions: ServiceDocument[];
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SERVICE_API}/${serviceSlug}`;

      const response: Response = await fetch(url);

      const serviceData: {
        service: ServiceDocument | null;
        suggestions: ServiceDocument[];
      } = await response.json();

      if (response.ok) {
        resolve(serviceData);
      } else {
        reject(null);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Service Data",
        error
      );

      reject(null);
    }
  });
};
