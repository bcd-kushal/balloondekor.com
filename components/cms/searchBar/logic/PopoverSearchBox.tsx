import {
  ArrowTopRightIcon,
  CardStackPlusIcon,
  CounterClockwiseClockIcon,
  ImageIcon,
  Link2Icon,
  ReaderIcon,
  ResumeIcon
} from "@radix-ui/react-icons";
import {
  SearchTagsListType,
  SearchTagsType
} from "../utils/types";
import { isValidInput } from "../utils/validInput";
import {
  FilledSearchFieldBox,
  SearchResultDataType
} from "./SearchOnType";
import Link from "next/link";
import { SearchSVG } from "@/constants/svgs/svg";
import Image from "next/image";
import FireSVG from "@/public/icons/fire.svg";
import SearchIcon from "@/public/icons/search.svg";

const recentSearches = [
  {
    label: "Annual decorations",
    timePast: "3m ago"
  },
  {
    label: "Balloon decorations",
    timePast: "3m ago"
  },
  { label: "Services", timePast: "3m ago" },
  {
    label: "Deocration in Kolkata",
    timePast: "3m ago"
  }
];

export function PopoverSearchBox({
  inputValue,
  setState,
  searchTags,
  searchData,
  tags,
  closeSearch
}: {
  inputValue: string;
  setState: React.Dispatch<
    React.SetStateAction<string>
  >;
  searchTags?: SearchTagsType;
  searchData: SearchResultDataType;
  tags: SearchTagsListType;
  closeSearch: () => void;
}) {
  return (
    <section className="grid w-screen max-sm:h-[100dvh] sm:max-w-[calc(100dvw_-_32px)] min-h-[200px] sm:w-[450px] md:w-[550px] *:row-start-1 *:col-start-1">
      {/* search bar for mobile ------------------------ */}
      <div className="sm:hidden translate-y-[10px] h-fit px-[14px] pb-[15px] pt-[14px] flex flex-col justify-start items-stretch gap-[12px] relative">
        <input
          type="text"
          name="searchField"
          placeholder="Search items..."
          value={inputValue}
          onChange={(e) =>
            setState(
              (prev) =>
                (e.target as HTMLInputElement)
                  .value
            )
          }
          title="searchField"
          className="border-b-[1px] bg-transparent border-b-neutral-400/50 text-[19px] pl-[34px] pb-[12px] flex items-center justify-start gap-[10px] transition-all duration-300 outline-none focus:outline-none focus:border-b-pink-600"
        />
        <SearchSVG
          dimensions={20}
          className="absolute left-[16px] top-[calc(50%_-_7px)] -translate-y-1/2"
        />{" "}
      </div>

      {isValidInput(inputValue) ? (
        <FilledSearchFieldBox
          needle={inputValue}
          searchData={searchData}
          haystack={{}}
          closeSearch={closeSearch}
        />
      ) : (
        <EmptySearchFieldBox
          inputValue={inputValue}
          tags={tags}
          setState={setState}
          closeSearch={closeSearch}
        />
      )}
    </section>
  );
}

{
  /* DEFAULT SEARCH SHOW ON CLICK ############################### */
}
const EmptySearchFieldBox = ({
  inputValue,
  tags,
  setState,
  closeSearch
}: {
  inputValue: string;
  tags: SearchTagsListType;
  setState: React.Dispatch<
    React.SetStateAction<string>
  >;
  closeSearch: () => void;
}) => {
  return (
    <section className="max-sm:translate-y-[64px] pt-[12px] flex flex-col items-stretch justify-start">
      {
        /* tags ------------------------ */
        tags && tags.length > 0 ? (
          <div className="px-[14px] pb-[25px] sm:pb-[15px] pt-[12px] sm:pt-[3px] border-b-[1px] border-transparent flex flex-col justify-start items-stretch gap-[12px]">
            <span className="font-semibold text-[20px] flex items-center justify-start gap-[10px]">
              <Image
                src={FireSVG.src}
                width={24}
                height={24}
                alt="trending"
                unoptimized
                priority
              />{" "}
              <span>Trending Searches</span>
            </span>
            <div className="flex flex-wrap items-center justify-start gap-[9px] *:rounded-xl *:py-[4px] *:px-[12px] *:border-[1px] *:border-slate-500/50 *:duration-300 *:transition-all">
              {tags.map((tag, index) => (
                <Link
                  href={tag.path}
                  className="flex items-center justify-evenly gap-[6px] text-[15px] cursor-pointer hover:text-white hover:border-pink-500/70 hover:bg-pink-500/80"
                  key={index}
                  onClick={() => {
                    console.log("AGHEJKE");
                    closeSearch();
                  }}
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )
      }
      {/* recent searches ------------------------ */}
      {/* <div className="px-[16px] max-sm:pt-[10px] flex flex-col relative gap-[4px] items-stretch justify-start max-h-[300px] overflow-y-scroll">
        <span className="font-semibold text-[20px] flex items-center justify-start gap-[10px] pt-[12px] pb-[4px]">
          <Image
            src={SearchIcon.src}
            width={24}
            height={24}
            alt="search"
            unoptimized
            priority
          />{" "}
          <span>Recent Searches</span>
        </span>
        <article className="flex flex-col items-stretch justify-start pb-[12px] pt-[12px] sm:pt-0">
          {recentSearches.map((recent, index) => (
            <div
              onClick={() =>
                setState((prev) => recent.label)
              }
              className={`group py-[8px] text-[16px] flex items-center justify-between transition-all duration-300 select-none ${index === 0 ? "" : "border-t-[1px] border-t-[#12121220]"} cursor-pointer`}
              key={index}
            >
              <span className="flex items-center gap-[12px] group-hover:text-pink-700 transition-colors duration-300 px-[6px]">
                <CounterClockwiseClockIcon
                  width={16}
                  height={16}
                />{" "}
                <span className="translate-y-0.5">
                  {recent.label}
                </span>
              </span>
              <span className="group-hover:opacity-100 opacity-0 text-[16px] text-[#12121260] transition-all duration-300">
                {recent.timePast}
              </span>
            </div>
          ))}
        </article>
      </div> */}
    </section>
  );
};
