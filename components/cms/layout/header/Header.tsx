"use client";

// libraries
import {
  KeyboardEvent,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";

// fetchAPIs
import { adminLogout } from "@/fetchAPIs/cms/auth";

// types
import { ResponseDataType } from "@/types/cms/api";

// styles
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  ChevronDownSVG,
  MessageSVG,
  NotificationSVG
} from "@/constants/svgs/svg";
import { HamburgerCollapsible } from "@/app/cms/(statusLayout)/(protected)/layout";
import SearchBar from "../../searchBar/SearchBar";
import {
  SearchBarProps,
  SearchTagsType
} from "../../searchBar/utils/types";

export default function Header({
  user,
  onClick,
  showBurger
}: {
  user: string;
  onClick: () => void;
  showBurger: boolean;
}) {
  // hooks
  const { push } = useRouter();

  const { addStatus: addStatus } =
    useStatusContext();

  const [isSidebarOpen, setIsSidebarOpen] =
    useState<boolean>(true);

  const {
    searchRef,
    setSearchRef,
    setSearch,
    keyword,
    setKeyword
  } = useSearchContext();

  useHotkeys("shift+ctrl+f", () => {
    searchRef?.focus();
  });

  const [reset, setReset] =
    useState<boolean>(false);

  const [nugget, setNugget] =
    useState<string>("");

  const handleReset = () => {
    setReset(true);
    setKeyword("");
    setSearch(true);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearch(true);
    }
  };

  const handleAdminLogout = (): void => {
    adminLogout()
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        push("/cms");
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const searchProps: SearchBarProps = {
    placeholder: "Search",
    popupSide: "bottom"
  };

  const searchTags: SearchTagsType = [
    { label: "Images", link: "", svg: <></> },
    { label: "Folders", link: "", svg: <></> },
    { label: "Categories", link: "", svg: <></> },
    { label: "Pages", link: "", svg: <></> }
  ];

  return (
    <div
      className={`bg-card-primary h-full self-stretch flex items-center justify-between px-[16px] md:px-[24px]`}
    >
      {/* hamburger menu icon ------------ */}
      {showBurger ? (
        <HamburgerCollapsible onClick={onClick} />
      ) : (
        <span></span>
      )}

      <div
        className={`max-w-[400px] w-[250px] translate-x-[64px]`}
      >
        <SearchBar
          props={searchProps}
          searchTags={searchTags}
          searchData={[]}
          searchValue=""
          setSearchValue={setNugget}
          tags={[]}
        />
      </div>

      <div
        className={`flex items-center justify-end gap-[8px] *:cursor-pointer *:transition-colors *:duration-300 *:h-10`}
      >
        <span
          className={`hover:bg-hover-tertiary w-[40px] aspect-square grid place-items-center rounded-full`}
        >
          <span className="grid row-start-1 col-start-1 absolute translate-y-[-10px] translate-x-[8px]">
            <span className="row-start-1 col-start-1 rounded-full h-[12px] min-w-3 p-[1px] text-white font-semibold text-center w-full bg-orange-400 flex items-center justify-center text-[7px] z-10 pt-[3px]">
              3
            </span>
            <span className="row-start-1 col-start-1 rounded-full h-[12px] min-w-[12px] p-[1px] bg-orange-400 animate-ping"></span>
          </span>
          <MessageSVG
            dimensions={19}
            className="row-start-1 col-start-1"
          />
        </span>
        <span
          className={`hover:bg-hover-tertiary w-[40px] aspect-square grid place-items-center rounded-full`}
        >
          <span className="grid row-start-1 col-start-1 absolute translate-y-[-10px] translate-x-[8px]">
            <span className="row-start-1 col-start-1 rounded-full h-[12px] min-w-[12px] p-[1px] text-white font-semibold text-center w-full bg-[#0075FE] flex items-center justify-center text-[7px] z-10 pt-[3px]">
              12
            </span>
            <span className="row-start-1 col-start-1 rounded-full h-[12px] min-w-[12px] p-[1px] bg-[#0075FE] animate-ping"></span>
          </span>
          <NotificationSVG
            dimensions={19}
            className="row-start-1 col-start-1"
          />
        </span>
        <span
          onClick={handleAdminLogout}
          className="pr-[8px] pl-[16px] ml-[4px] flex text-[16px] items-center justify-center gap-[4px] border-l-[1px] border-[#12121230]"
          style={{ height: "30px" }}
        >
          <span className="bg-[#121212] text-white w-[28px] h-[28px] scale-105 rounded-full flex items-center justify-center overflow-hidden">
            {user.slice(0, 1)}
          </span>
          <div className={`text-[12px] mx-[4px]`}>
            Hi,{" "}
            <span className="font-semibold">
              {user}
            </span>
          </div>
          <ChevronDownSVG />
        </span>
      </div>
    </div>
  );
}
