/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  SetStateAction,
  useEffect,
  useState
} from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import SelectCityUI from "@/components/ui/service/info/order/SelectCityUI";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { CityDocument } from "@/schemas/cms/city";
import CityUI from "@/components/ui/city/CityUI";

export default function SelectCityDrawer({
  isDateTimeSelected,
  isCitySelected,
  setDateTimeState,
  setCityState
}: {
  isDateTimeSelected: boolean;
  isCitySelected: boolean;
  setDateTimeState: React.Dispatch<
    SetStateAction<boolean>
  >;
  setCityState: React.Dispatch<
    SetStateAction<boolean>
  >;
}) {
  const {
    topCities,
    currentCity,
    onChangeCurrentCity,
    onSearchCity
  } = useCityContext();

  const [cities, setCities] = useState<
    CityDocument[]
  >([]);
  const [keyword, setKeyword] =
    useState<string>("");
  const [hasSearched, setHasSearched] =
    useState<boolean>(false);

  const handleChangeKeyword = (
    newKeyword: string
  ) => {
    if (!hasSearched && newKeyword.trim()) {
      setHasSearched(true);
    }

    setKeyword(
      newKeyword.trim()
        ? newKeyword
        : newKeyword.trim()
    );
  };

  const handleSelectCity = (cityName: string) => {
    onChangeCurrentCity(cityName);
    // SET STATE HERE ------------------------------------------------
    setCityState((prev) => true);
    // onClose();
  };

  useEffect(() => {
    if (currentCity?.name)
      setCityState((prev) => true);
  }, [currentCity?.name]);

  useEffect(() => {
    setCities(onSearchCity(keyword));
  }, [keyword]);

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          {/* SELECT CITY BUTTON ================= */}
          <SelectCityUI
            activeCityName={currentCity?.name}
            onClick={() => {}}
          />
        </DrawerTrigger>
        <DrawerContent className="min-h-[440px] max-h-[75dvh] pt-[16px] outline-none">
          <>
            <CityUI
              hasSearched={hasSearched}
              keyword={keyword}
              cities={cities}
              topCities={topCities}
              type="drawer"
              onToggleHasSearched={() => {
                setHasSearched(!hasSearched);
              }}
              onSearch={handleChangeKeyword}
              onSelectCity={handleSelectCity}
            />
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}
