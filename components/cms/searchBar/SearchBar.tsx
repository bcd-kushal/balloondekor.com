"use client";
import React, {
  SetStateAction,
  useEffect,
  useState
} from "react";
import { PopoverSearchBox } from "./logic/PopoverSearchBox";
import { SearchSVG } from "./utils/svgs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  SearchBoxInputType,
  SearchBarProps,
  SearchTagsType,
  SearchTagsListType
} from "./utils/types";
import { DOMAIN } from "@/constants/frontend/apiRoute";
import { SearchResultDataType } from "./logic/SearchOnType";

const SearchBoxInput = ({
  placeholder,
  onKeyUp,
  searchVal
}: SearchBoxInputType) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchVal}
      onChange={(e) =>
        onKeyUp(
          (prev) =>
            (e.target as HTMLInputElement).value
        )
      }
      className="outline-none bg-transparent border-none max-w-full w-[100%]"
    />
  );
};

export default function SearchBar({
  props,
  searchTags,
  searchData,
  tags,
  searchValue,
  setSearchValue
}: {
  props: SearchBarProps;
  searchTags?: SearchTagsType;
  searchData: SearchResultDataType;
  tags: SearchTagsListType;
  searchValue: string;
  setSearchValue: React.Dispatch<
    SetStateAction<string>
  >;
}) {
  const placeholder =
    props.placeholder || "Search";
  const searchBoxSide =
    props.popupSide || "bottom";

  const [showModal, setShowModal] =
    useState<boolean>(true);

  return (
    <div
      className="w-full self-center h-fit py-[10px] px-[20px] hidden min-[768px]:flex flex-row-reverse gap-2 items-center justify-start rounded-2xl text-[16px] border-[1px] border-[#e8e8e8]  transition-all duration-300"
      style={{
        boxShadow: "0 2px 8px rgba(28,28,28,.08)"
      }}
    >
      <SearchSVG
        className="stroke-[#3f3f3f]"
        dimensions={22}
      />
      <Popover
        modal={true}
        open={!showModal}
        onOpenChange={() =>
          setShowModal((prev) => !prev)
        }
      >
        {/* Input field ------------------------------------ */}
        <PopoverTrigger
          className="w-full"
          onClick={() =>
            setShowModal((prev) => true)
          }
        >
          <SearchBoxInput
            searchVal={searchValue}
            onKeyUp={setSearchValue}
            placeholder={placeholder}
          />
        </PopoverTrigger>

        {/* Popup field ------------------------------------ */}
        <PopoverContent
          sideOffset={15}
          onOpenAutoFocus={(e) =>
            e.preventDefault()
          }
          side={searchBoxSide}
          className="p-0 w-fit max-w-[calc(100dvw_-_32px)] min-w-[288px] shadow-2xl -translate-x-[12px] rounded-3xl overflow-hidden"
        >
          <PopoverSearchBox
            inputValue={searchValue}
            setState={setSearchValue}
            searchTags={searchTags}
            searchData={searchData}
            tags={tags}
            closeSearch={() => {
              setShowModal((prev) => !prev);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
