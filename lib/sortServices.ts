import { ServiceListSortType } from "@/components/client/service/ServicePage";
import { CityDocument } from "@/schemas/cms/city";
import {
  PriceDocument,
  QualityDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { OtherServicesCityWiseType } from "@/types/frontend/service";

export const sortServices = ({
  services,
  filterType,
  city
}: {
  services: ServiceDocument[];
  filterType:
    | "popular"
    | "highToLow"
    | "lowToHigh";
  city: string;
}): ServiceDocument[] => {
  // create a hashmap ---------------------------------
  let map: {
    [key: string]: ServiceDocument[];
  } = {};

  // map up based on sort type ------------------------
  services.forEach((service) => {
    const index =
      filterType === "popular"
        ? String(
            (service.quality as QualityDocument)
              .totalReviews || 0
          )
        : String(
            getCityWisePrice({
              currCity: city,
              prices: service.price
            })
          );

    if (index in map) {
      map[index].push(service);
    } else {
      map[index] = [service];
    }
  });

  const objects = Object.entries(map);
  const len = objects.length;
  let sortedServices: ServiceDocument[] = [];

  if (filterType === "lowToHigh") {
    for (let i = 0; i < len; i += 1) {
      const list = objects[i][1];
      list.forEach((insideService) =>
        sortedServices.push(insideService)
      );
    }
  } else {
    for (let i = len - 1; i >= 0; i -= 1) {
      const list = objects[i][1];
      list.forEach((insideService) =>
        sortedServices.push(insideService)
      );
    }
  }

  // @ts-ignore
  return sortedServices;
};

export const getCityWisePrice = ({
  currCity,
  prices
}: {
  currCity: string;
  prices: PriceDocument;
}): number => {
  if (
    currCity === "" ||
    prices.cities.length === 0
  )
    return prices.base.price;

  const cityList = prices.cities;

  const filteredPrice: number | undefined =
    cityList.find(
      ({ city }) =>
        (
          city as CityDocument
        ).name.toLowerCase() ===
        currCity.toLowerCase()
    )?.price;

  if (filteredPrice) return filteredPrice;
  return prices.base.price;
};

export const getCityWisePriceById = ({
  cityId,
  prices
}: {
  cityId: string;
  prices: PriceDocument;
}): number => {
  if (
    cityId === "" ||
    cityId === undefined ||
    cityId === null ||
    prices.cities.length === 0
  )
    return prices.base.price;

  const cityList = prices.cities;

  const filteredPrice: number | undefined =
    cityList.find(
      ({ city }) =>
        (city as unknown as string) === cityId
    )?.price;

  if (filteredPrice) return filteredPrice;
  return prices.base.price;
};

export const sortCondensedServices = ({
  otherServices,
  sortType
}: {
  otherServices: OtherServicesCityWiseType;
  sortType: ServiceListSortType;
}): OtherServicesCityWiseType => {
  let map: {
    [key: string]: OtherServicesCityWiseType;
  } = {};

  otherServices.forEach(
    ({ link, price, totalReviews }) => {
      const index =
        sortType === "popularity"
          ? String(totalReviews || 0)
          : String(price);

      if (index in map)
        map[index].push({
          link,
          price,
          totalReviews
        });
      else
        map[index] = [
          { link, price, totalReviews }
        ];
    }
  );

  const objects = Object.entries(map);
  const len = objects.length;
  let sorted: OtherServicesCityWiseType = [];

  if (sortType === "lowToHigh") {
    for (let i = 0; i < len; i += 1) {
      const list = objects[i][1];
      list.forEach((otherService) => {
        sorted.push(otherService);
      });
    }
  } else {
    for (let i = len - 1; i >= 0; i -= 1) {
      const list = objects[i][1];
      list.forEach((otherService) => {
        sorted.push(otherService);
      });
    }
  }

  return sorted;
};
