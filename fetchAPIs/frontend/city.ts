// constants
import {
  DOMAIN,
  CITY_API
} from "@/constants/frontend/apiRoute";

// types
import { CityDocument } from "@/schemas/cms/city";

export const getCities = (): Promise<
  CityDocument[]
> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}`;

      const response: Response = await fetch(url);

      const cities: CityDocument[] =
        await response.json();

      if (response.ok) {
        resolve(cities);
      } else {
        reject([]);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Cities",
        error
      );

      reject([]);
    }
  });
};
