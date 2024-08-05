/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Footer from "@/components/cms/footer/ui/Footer";
import FooterLinkList from "@/components/cms/footer/FooterLinkList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY
} from "@/constants/cms/footerLinkSection";

// fetchAPIs
import {
  getFooterLinkSections,
  activateFooterLinkSection,
  reorderFooterLinkSections,
  deleteFooterLinkSection
} from "@/fetchAPIs/cms/footerLinkSection";

// types
import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

// styles
import { PlusSVG } from "@/constants/svgs/svg";
import Link from "next/link";

export default function FooterManagementPage() {
  // hooks
  const { addStatus } = useStatusContext();

  // list states
  const [
    footerLinkSections,
    setFooterLinkSections
  ] = useState<FooterLinkSectionDocument[]>([]);

  // handlers
  const handleGetFooterLinkSections =
    (): void => {
      setFooterLinkSections([]);
      getFooterLinkSections({
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
            setFooterLinkSections(
              responseData.data as FooterLinkSectionDocument[]
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

  const handleToggleFooterLinkSectionActive = (
    footerLinkSectionId: string,
    isActive: boolean
  ): void => {
    activateFooterLinkSection(
      footerLinkSectionId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setFooterLinkSections(
          (prevFooterLinkSections) =>
            prevFooterLinkSections.map(
              (prevFooterLinkSection) => {
                if (
                  prevFooterLinkSection._id ===
                  footerLinkSectionId
                ) {
                  prevFooterLinkSection.isActive =
                    isActive;
                }

                return prevFooterLinkSection;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleReorderFooterLinkSection = (
    id1: string,
    id2: string
  ): void => {
    const order1 = footerLinkSections.find(
      ({ _id }) => _id === id1
    )?.order as number;
    const order2 = footerLinkSections.find(
      ({ _id }) => _id === id2
    )?.order as number;

    reorderFooterLinkSections(id1, id2)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setFooterLinkSections(
          [
            ...footerLinkSections.map(
              (footerLinkSection) => {
                if (
                  footerLinkSection._id === id1
                ) {
                  footerLinkSection.order =
                    order2;
                }
                if (
                  footerLinkSection._id === id2
                ) {
                  footerLinkSection.order =
                    order1;
                }

                return footerLinkSection;
              }
            )
          ].sort((a, b) => a.order - b.order)
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteFooterLinkSection = (
    footerLinkSectionId: string
  ): void => {
    deleteFooterLinkSection(footerLinkSectionId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setFooterLinkSections(
          footerLinkSections.filter(
            ({ _id }) =>
              _id !== footerLinkSectionId
          )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetFooterLinkSections();
  }, []);

  return (
    <div
      className={`bg-backdrop-primary flex flex-col relative h-full overflow-y-scroll scrollbar-hide`}
    >
      <div className={`px-5 mt-7`}>
        {/* footer preview ----------------------- */}
        <div
          className={`scale-[.85] h-[310px] relative -translate-y-4`}
        >
          <Footer
            footerLinkSections={footerLinkSections.filter(
              ({ isActive }) => isActive
            )}
          />
        </div>
      </div>

      {/* footer data table ---------------------------- */}
      <div className="w-full px-5 flex flex-col items-stretch justify-start gap-3 border-t-[1.5px] border-[#12121220]">
        {/* add section + header ====================== */}
        <div className="pt-4 pb-2 flex items-center justify-between">
          <span className="text-[18px]">
            Items in footer
          </span>
          <Link
            className="px-[12px] py-[8px] bg-[#121212] text-white rounded-lg flex items-center text-[14px] gap-[4px]"
            href={"/cms/pages/footer/add"}
          >
            <PlusSVG /> Add section
          </Link>
        </div>

        {/* footer table ============================ */}
        <div className="h-[calc(100dvh_-_483px)]">
          <FooterLinkList
            offset={0}
            footerLinkSections={
              footerLinkSections
            }
            onToggleActive={
              handleToggleFooterLinkSectionActive
            }
            onReorder={
              handleReorderFooterLinkSection
            }
            onDelete={
              handleDeleteFooterLinkSection
            }
          />
        </div>
      </div>
    </div>
  );
}
