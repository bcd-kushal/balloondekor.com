"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useScreenContext } from "@/hooks/useScreenContext";

import { NoSearchResult } from "../utils/NoSearchResult";
import { DialogClose } from "@/components/ui/dialog";

export type SearchResultDataType = {
  name: string;
  category: string;
  price: number;
  icon?: string;
  link: string;
}[];

{
  /* SEARCH SHOW ON INPUT VALUE ENTRY ############################### */
}
export const FilledSearchFieldBox = ({
  needle,
  haystack,
  searchData,
  closeSearch
}: {
  needle: string;
  haystack: any;
  searchData: SearchResultDataType;
  closeSearch: () => void;
}) => {
  const [hasLoaded, setHasLoaded] =
    useState<boolean>(true);
  const [filteredData, setFilteredData] =
    useState<SearchResultDataType>([]);

  useEffect(() => {
    setFilteredData((prev) =>
      searchData.filter(
        ({ name, category }) =>
          name
            .toLowerCase()
            .includes(needle.toLowerCase()) ||
          category
            .toLowerCase()
            .includes(needle.toLowerCase())
      )
    );
  }, [needle, searchData]);

  return (
    <section className="max-sm:translate-y-[64px] max-sm:max-h-[calc(100dvh_-_64px)] max-h-screen flex flex-col items-stretch justify-start gap-[4px]">
      {hasLoaded ? (
        <ShowSearchResults
          needle={needle}
          data={filteredData}
          closeSearch={closeSearch}
        />
      ) : (
        <NoSearchResult searchWord={needle} />
      )}
    </section>
  );
};

export function ShowSearchResults({
  data,
  needle,
  closeSearch
}: {
  data: SearchResultDataType;
  needle: string;
  closeSearch: () => void;
}) {
  if (data.length === 0)
    return <NoSearchResult searchWord={needle} />;

  return (
    <>
      <span className="py-[12px] px-[12px] text-[#12121275] w-full text-center text-[16px]">
        Showing search results for &apos;{needle}
        &apos;
      </span>
      <div className="flex flex-col items-stretch justify-start even:*:bg-[#12121209] overflow-y-scroll sm:max-h-[380px] scrollbar-hide">
        {data.map(
          (
            { name, category, link, icon, price },
            index
          ) => (
            <Link
              href={link}
              key={index}
              prefetch
              onClick={closeSearch}
              className="flex items-center justify-start px-[16px] gap-[12px] py-[8px] transition-all duration-300 hover:bg-pink-300/30"
            >
              {icon ? (
                <div className="overflow-hidden aspect-square rounded-lg h-[40px] w-[40px] bg-neutral-400">
                  <Image
                    src={icon}
                    width={40}
                    height={40}
                    alt="iconPfp"
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col w-[calc(100%_-_124px)] ">
                <h2 className="text-[18px] line-clamp-1">
                  {name}
                </h2>
                <span className="mt-[-2px] text-[16px] text-zinc-600">
                  {category}
                </span>
              </div>
              <div className="text-[16.5px] flex items-center font-medium w-[60px]">
                ₹ {price}
              </div>
            </Link>
          )
        )}
      </div>
    </>
  );
}
