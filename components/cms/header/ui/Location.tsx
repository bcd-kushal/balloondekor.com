/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";

import { useCityContext } from "@/hooks/useCityContext";

import { getCities } from "@/fetchAPIs/frontend/city";

import styles from "@/components/cms/header/ui/location.module.css";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import CityUI from "@/components/ui/city/CityUI";
import { CityDocument } from "@/schemas/cms/city";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  ChevronDownSVG,
  CompassSVG
} from "@/constants/svgs/svg";

export default function Location() {
  const {
    topCities,
    currentCity,
    onChangeCurrentCity,
    onSearchCity
  } = useCityContext();

  const [
    isMobileDimension,
    setIsMobileDimension
  ] = useState<boolean>(false);
  const [cities, setCities] = useState<
    CityDocument[]
  >([]);
  const [keyword, setKeyword] =
    useState<string>("");
  const [hasSearched, setHasSearched] =
    useState<boolean>(false);
  const [desktopPopupOpen, setDesktopPopupOpen] =
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
    if (desktopPopupOpen)
      setDesktopPopupOpen((prev) => false);
  };

  useEffect(() => {
    const checkScreen = () => {
      if (innerWidth < 480 && !isMobileDimension)
        setIsMobileDimension((prev) => true);
      if (innerWidth >= 480 && isMobileDimension)
        setIsMobileDimension((prev) => false);
    };
    addEventListener("resize", checkScreen);
    checkScreen();
    getCities().then(
      (fetchedCities: CityDocument[]) => {
        setCities(fetchedCities);
      }
    );
    return () => {};
  }, []);

  useEffect(() => {
    setCities(onSearchCity(keyword));
  }, [keyword]);

  return (
    <>
      {!isMobileDimension ? (
        // DESKTOP SCREENS +===========================================================
        <Dialog>
          <DialogTrigger
            className="w-full outline-none"
            asChild
          >
            {/* trigger UI ----------------------- */}
            <div
              className={styles.container}
              onClick={() => {}}
              // aria-controls="frontendSearch"
            >
              <CompassSVG fill="#d4378f" />
              <span className={styles.location}>
                {currentCity
                  ? currentCity.name
                  : "City"}
              </span>
              <ChevronDownSVG dimensions={12} />
              {currentCity && currentCity.name ? (
                <></>
              ) : (
                <span className="py-1 px-4 rounded-lg text-white bg-pink-600 animate-pulse font-medium text-[13px]">
                  Select
                </span>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit rounded-3xl min-w-[450px] p-0 max-w-[95dvw]">
            {/* popup card --------------------------- */}
            <CityUI
              hasSearched={hasSearched}
              keyword={keyword}
              cities={cities}
              topCities={topCities}
              onToggleHasSearched={() => {
                setHasSearched(!hasSearched);
              }}
              onSearch={handleChangeKeyword}
              onSelectCity={handleSelectCity}
              type="dialog"
            />
          </DialogContent>
        </Dialog>
      ) : (
        // MOBILE SCREENS +=====================================================
        <Drawer>
          <DrawerTrigger
            className="w-full"
            asChild
          >
            {/* trigger UI ------------------------------ */}
            <div
              className={styles.container}
              onClick={() => {}}
            >
              <CompassSVG fill="#d4378f" />
              <span className={styles.location}>
                {currentCity
                  ? currentCity.name
                  : "City"}
                <ChevronDownSVG dimensions={12} />
                {currentCity &&
                currentCity.name ? (
                  <></>
                ) : (
                  <span className="py-1 px-4 ml-1 rounded-lg text-white bg-pink-600 animate-pulse font-medium text-[13px]">
                    Select
                  </span>
                )}
              </span>
            </div>
          </DrawerTrigger>
          <DrawerContent className="min-h-fit max-h-[75dvh] pt-[16px] px-0 outline-none">
            {/* slide up card ------------------------------- */}
            <CityUI
              hasSearched={hasSearched}
              keyword={keyword}
              cities={cities}
              topCities={topCities}
              onToggleHasSearched={() => {
                setHasSearched(!hasSearched);
              }}
              onSearch={handleChangeKeyword}
              onSelectCity={handleSelectCity}
              type="drawer"
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
