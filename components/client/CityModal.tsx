/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  SetStateAction,
  useEffect,
  useState
} from "react";

import { useCityContext } from "@/hooks/useCityContext";

import Backdrop from "../common/Backdrop";
import CityUI from "@/components/ui/city/CityUI";

import { CityDocument } from "@/schemas/cms/city";

export default function CityModal({
  onClose,
  isDateTimeSelected,
  isCitySelected,
  type,
  setDateTimeState,
  setCityState
}: {
  onClose: () => void;
  isDateTimeSelected: boolean;
  isCitySelected: boolean;
  type: "dialog" | "drawer";
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
    // SET STATE HERE --------------------------------------------------------
    setCityState((prev) => true);
    onClose();
  };

  useEffect(() => {
    if (currentCity?.name)
      setCityState((prev) => true);
  }, [currentCity?.name]);

  useEffect(() => {
    setCities(onSearchCity(keyword));
  }, [keyword]);

  return (
    // <Backdrop onClick={onClose}>
    <CityUI
      hasSearched={hasSearched}
      keyword={keyword}
      cities={cities}
      topCities={topCities}
      type={type}
      onToggleHasSearched={() => {
        setHasSearched(!hasSearched);
      }}
      onSearch={handleChangeKeyword}
      onSelectCity={handleSelectCity}
    />
    // </Backdrop>
  );
}
