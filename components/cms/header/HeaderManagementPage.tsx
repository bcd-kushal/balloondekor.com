/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Header from "@/components/cms/header/ui/Header";
import PageHeader from "@/components/cms/PageHeader";
import HeaderLinkList from "@/components/cms/header/HeaderLinkList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY
} from "@/constants/cms/navLink";

// hooks
import { CityContextProvider } from "@/hooks/useCityContext";

// fetchAPIs
import {
  getNavLinks,
  activateNavLink,
  reorderNavLinks,
  deleteNavLink
} from "@/fetchAPIs/cms/navLink";

// types
import { NavLinkDocument } from "@/schemas/cms/navLink";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

// styles
import styles from "@/components/cms/header/headerManagementPage.module.css";
import Link from "next/link";
import { PlusSVG } from "@/constants/svgs/svg";
import { SettingDocument } from "@/schemas/cms/setting";

export default function HeaderManagementPage() {
  // hooks
  const { addStatus } = useStatusContext();

  // list states
  const [navLinks, setNavLinks] = useState<
    NavLinkDocument[]
  >([]);

  // handlers
  const handleGetNavLinks = (): void => {
    setNavLinks([]);
    getNavLinks({
      populate: true,
      active: false,
      deleted: false,
      offset: 0,
      limit: 0,
      sortBy: DEFAULT_SORT_BY,
      orderBy: DEFAULT_ORDER_BY,
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setNavLinks(
            responseData.data as NavLinkDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleToggleNavLinkActive = (
    navLinkId: string,
    isActive: boolean
  ): void => {
    activateNavLink(navLinkId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((prevNavLink) => {
            if (prevNavLink._id === navLinkId) {
              prevNavLink.isActive = isActive;
            }

            return prevNavLink;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleReorderNavLink = (
    id1: string,
    id2: string
  ): void => {
    const order1 = navLinks.find(
      ({ _id }) => _id === id1
    )?.order as number;
    const order2 = navLinks.find(
      ({ _id }) => _id === id2
    )?.order as number;

    reorderNavLinks(id1, id2)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setNavLinks(
          [
            ...navLinks.map((homepageLayout) => {
              if (homepageLayout._id === id1) {
                homepageLayout.order = order2;
              }
              if (homepageLayout._id === id2) {
                homepageLayout.order = order1;
              }

              return homepageLayout;
            })
          ].sort((a, b) => a.order - b.order)
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteNavLink = (
    navLinkId: string
  ): void => {
    deleteNavLink(navLinkId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setNavLinks(
          navLinks.filter(
            ({ _id }) => _id !== navLinkId
          )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetNavLinks();
  }, []);

  return (
    <div
      className={`bg-backdrop-primary flex flex-col relative h-full overflow-y-scroll scrollbar-hide`}
    >
      <div className={`px-5 mt-7`}>
        {/* header preview ----------------------- */}
        <div
          className={`scale-[.95] h-[200px] relative -translate-y-4`}
        >
          <CityContextProvider>
            <Header
              settings={{} as SettingDocument}
              cities={[]}
              navLinks={navLinks.filter(
                ({ isActive }) => isActive
              )}
              trendings={[]}
              searchTags={[]}
            />
          </CityContextProvider>
        </div>
      </div>

      {/* header data table ---------------------------- */}
      <div className="w-full px-[20px] pt-[10px] flex flex-col items-stretch justify-start gap-3 border-t-[1.5px] border-[#12121220]">
        {/* add section + header ====================== */}
        <div className="pt-4 pb-2 flex items-center justify-between">
          <span className="text-[18px]">
            Header nav links
          </span>
          <Link
            className="px-[12px] py-[8px] bg-[#121212] text-white rounded-lg flex items-center text-[14px] gap-[4px]"
            href={"/cms/pages/header/add"}
          >
            <PlusSVG /> Add nav link
          </Link>
        </div>

        {/* footer table ============================ */}
        <div className="h-[calc(100dvh_-_373px)]">
          <HeaderLinkList
            offset={0}
            navLinks={navLinks}
            onToggleActive={
              handleToggleNavLinkActive
            }
            onReorder={handleReorderNavLink}
            onDelete={handleDeleteNavLink}
          />
        </div>
      </div>
    </div>
  );
}
