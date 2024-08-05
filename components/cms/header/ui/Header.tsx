/* eslint-disable react-hooks/exhaustive-deps */

"use client";

//libraries
import { useEffect, useState } from "react";

import { useCityContext } from "@/hooks/useCityContext";

import Actions from "./Actions";
import Location from "./Location";
import Logo from "./Logo";
import Search from "./Search";

import styles from "@/components/cms/header/ui/header.module.css";

import { CityDocument } from "@/schemas/cms/city";
import { NavLinkDocument } from "@/schemas/cms/navLink";
import { TrendingDocument } from "@/schemas/cms/trending";
import { usePathname } from "next/navigation";
import { SearchResultDataType } from "../../searchBar/logic/SearchOnType";
import { getServicesForSearch } from "@/components/frontend/Header";
import { SearchTagsListType } from "../../searchBar/utils/types";
import { SettingDocument } from "@/schemas/cms/setting";
import { useSettingsContext } from "@/hooks/useSettingsContext";

export default function Header({
  settings,
  cities,
  navLinks,
  trendings,
  searchTags
}: {
  settings: SettingDocument;
  cities: CityDocument[];
  navLinks: NavLinkDocument[];
  trendings: TrendingDocument[];
  searchTags: SearchTagsListType;
}) {
  const { setSettings } = useSettingsContext();

  const { onChangeCities, currentCity } =
    useCityContext();

  const [search, setSearch] =
    useState<boolean>(false);
  const [menu, setMenu] =
    useState<boolean>(false);
  const [searchData, setSearchData] =
    useState<SearchResultDataType>([]);
  const [searchValue, setSearchValue] =
    useState<string>("");

  const searchHandler = () => {
    setSearch(!search);
  };

  const menuHandler = () => {
    setMenu(!menu);
  };

  const path = usePathname();

  useEffect(() => {
    setSettings(settings);
  }, [settings]);

  useEffect(() => {
    onChangeCities(cities);
  }, [cities]);

  useEffect(() => {
    getServicesForSearch(currentCity).then(
      (searchList) =>
        setSearchData((prev) => searchList)
    );
  }, [currentCity]);

  return (
    <header
      className={`${path.includes("/cart") ? "hidden" : styles.container}`}
    >
      <section className={styles.topSection}>
        <Logo menuHandler={menuHandler} />
        <span className={styles.location}>
          <Location />
        </span>
        <Search
          searchData={searchData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          tags={searchTags}
        />
        <Actions
          handler={searchHandler}
          searchData={searchData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          tags={searchTags}
        />
      </section>
    </header>
  );
}
