/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import Cookies from "js-cookie";

// types
import { CityDocument } from "@/schemas/cms/city";

type CityContextValueType = {
  cities: CityDocument[];
  topCities: CityDocument[];
  currentCity: CityDocument | undefined;
  onChangeCities: (
    cities: CityDocument[]
  ) => void;
  onChangeCurrentCity: (cityName: string) => void;
  onSearchCity: (
    cityName: string
  ) => CityDocument[];
};

const CityContext = createContext<
  CityContextValueType | undefined
>(undefined);

export function CityContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [cities, setCities] = useState<
    CityDocument[]
  >([]);
  const [topCities, setTopCities] = useState<
    CityDocument[]
  >([]);
  const [currentCity, setCurrentCity] = useState<
    CityDocument | undefined
  >();

  const handleSetCurrentCity = (
    cityName: string
  ): void => {
    if (
      cities.filter(
        ({ name }) =>
          name.toLowerCase() ===
          cityName.toLowerCase()
      ).length
    ) {
      setCurrentCity(
        cities.filter(
          ({ name }) =>
            name.toLowerCase() ===
            cityName.toLowerCase()
        )[0]
      );
    } else {
      setCurrentCity(undefined);
    }
  };

  const handleSearchCity = (
    cityName: string
  ): CityDocument[] =>
    cities.filter(({ name }) =>
      name
        .toLowerCase()
        .includes(cityName.toLowerCase())
    );

  useEffect(() => {
    const initialCityName = Cookies.get(
      "balloondekorCity"
    );

    if (initialCityName) {
      handleSetCurrentCity(initialCityName);
    }

    setTopCities(
      cities.filter(({ isTopCity }) => isTopCity)
    );
  }, [cities]);

  useEffect(() => {
    if (cities.length) {
      if (currentCity) {
        Cookies.set(
          "balloondekorCity",
          currentCity.name,
          {
            expires: 365
          }
        );
      } else {
        Cookies.remove("balloondekorCity");
      }
    }
  }, [currentCity]);

  return (
    <CityContext.Provider
      value={{
        cities,
        topCities,
        currentCity,
        onChangeCities: setCities,
        onChangeCurrentCity: handleSetCurrentCity,
        onSearchCity: handleSearchCity
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export const useCityContext =
  (): CityContextValueType => {
    const cityContext = useContext(CityContext);

    if (!cityContext) {
      throw new Error(
        "useCityContext must be used within a CityContextProvider"
      );
    }

    return cityContext;
  };
