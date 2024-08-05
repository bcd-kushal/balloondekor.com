"use client";
import { SetStateAction } from "react";
import SearchBar from "../../searchBar/SearchBar";
import { SearchResultDataType } from "../../searchBar/logic/SearchOnType";
import { SearchTagsListType } from "../../searchBar/utils/types";

export default function Search({
  searchData,
  tags,
  searchValue,
  setSearchValue
}: {
  searchData: SearchResultDataType;
  tags: SearchTagsListType;
  searchValue: string;
  setSearchValue: React.Dispatch<
    SetStateAction<string>
  >;
}) {
  return (
    <SearchBar
      props={{
        placeholder:
          "Search for Birthady Decoration",
        popupSide: "bottom"
      }}
      searchTags={[
        { label: "Lorem", link: "#", svg: <></> }
      ]}
      searchData={searchData}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tags={tags}
    />
  );
}
