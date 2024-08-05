/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import PageHeader from "@/components/cms/PageHeader";
import HomepageLayoutList from "@/components/cms/homepage/HomepageLayoutList";

// constants
import {
  DEFAULT_SORT_BY,
  DEFAULT_ORDER_BY
} from "@/constants/cms/homepage";

// fetchAPIs
import {
  getHomepageLayouts,
  activateHomepageLayout,
  reorderHomepageLayout,
  deleteHomepageLayout
} from "@/fetchAPIs/cms/homepage";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function HomepageManagementPage({
  title,
  pageComponentToPreview
}: {
  title?: string;
  pageComponentToPreview?: JSX.Element;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // list states
  const [homepageLayouts, setHomepageLayouts] =
    useState<HomepageLayoutDocument[]>([]);
  const [currPreviewMode, setCurrPreviewMode] =
    useState<"mobile" | "desktop">("desktop");

  // handlers
  const handleGetHomepageLayouts = () => {
    setHomepageLayouts([]);
    getHomepageLayouts({
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
          setHomepageLayouts(
            responseData.data as HomepageLayoutDocument[]
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

  const handleToggleHomepageLayoutActive = (
    homepageLayoutId: string,
    isActive: boolean
  ): void => {
    activateHomepageLayout(
      homepageLayoutId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setHomepageLayouts(
          (prevHomepageLayouts) =>
            prevHomepageLayouts.map(
              (prevHomepageLayout) => {
                if (
                  prevHomepageLayout._id ===
                  homepageLayoutId
                ) {
                  prevHomepageLayout.isActive =
                    isActive;
                }

                return prevHomepageLayout;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleReorderHomepageLayout = (
    id1: string,
    id2: string
  ): void => {
    const order1 = homepageLayouts.find(
      ({ _id }) => _id === id1
    )?.order as number;
    const order2 = homepageLayouts.find(
      ({ _id }) => _id === id2
    )?.order as number;

    reorderHomepageLayout(id1, id2)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setHomepageLayouts(
          [
            ...homepageLayouts.map(
              (homepageLayout) => {
                if (homepageLayout._id === id1) {
                  homepageLayout.order = order2;
                }
                if (homepageLayout._id === id2) {
                  homepageLayout.order = order1;
                }

                return homepageLayout;
              }
            )
          ].sort((a, b) => a.order - b.order)
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteHomepageLayout = (
    homepageLayoutId: string
  ): void => {
    deleteHomepageLayout(homepageLayoutId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setHomepageLayouts(
          homepageLayouts.filter(
            ({ _id }) => _id !== homepageLayoutId
          )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetHomepageLayouts();
  }, []);

  return (
    <>
      {/* <div
      className={`h-full flex flex-col items-stretch justify-start`}
    > */}
      {/* headings ---------------------- */}
      {/* <div className="px-[20px] pt-[24px] pb-[0px] flex items-center justify-between"> */}
      {/* left side ------ */}
      {/* <div className="flex flex-col items-start justify-center gap-[4px]">
          <h2 className="text-[20px]">
            {title || "Home Page"}
          </h2> */}
      {/* <h4 className="text-[14px]">
            Preview mode:
            {` ${capitalize(currPreviewMode)}`}
          </h4> */}
      {/* </div> */}

      {/* right side ------- */}
      {/* <div className="flex items-center justify-end"> */}
      {/* <span className="flex items-center justify-end gap-4 *:text-[14px]">
            <span>Desktop layout</span>
            <Switch
              checked={
                currPreviewMode === "desktop"
                  ? false
                  : true
              }
              onClick={() =>
                setCurrPreviewMode((prev) =>
                  prev === "desktop"
                    ? "mobile"
                    : "desktop"
                )
              }
            />
            <span>Mobile layout</span>
          </span> */}
      {/* /* </div>
      </div>  */}
      {/* layout preview ---------------- */}
      {/* <section
        className={` py-[12px] px-[8px] pb-[32px] h-full max-h-[calc(100dvh_-_131px)] grid place-items-center overflow-y-scroll scrollbar-hide`}
      > */}
      {/* {currPreviewMode === "desktop" ? (
          <section className="max-w-[85%] min-w-[77%] aspect-video bg-slate-900 rounded-xl p-[8px] flex items-center justify-center">
            <div className="w-full h-full bg-slate-200 rounded-lg overflow-y-scroll scrollbar-hide flex flex-col items-stretch justify-start">
              desktop
            </div>
          </section>
        ) : (
          <section className="max-w-screen min-h-[95%] aspect-[1/2] bg-slate-900 rounded-xl p-[4px] pb-[12px]">
            <div className="w-full h-full bg-slate-200 rounded-lg">
              mobile
            </div>
          </section>
        )} */}
      {/* <HomepageLayoutList
          homepageLayouts={homepageLayouts}
          onToggleActive={
            handleToggleHomepageLayoutActive
          }
          onReorder={handleReorderHomepageLayout}
          onDelete={handleDeleteHomepageLayout}
        />
      </section> */}

      <CMSPageLayout title={title || "Home Page"}>
        <HomepageLayoutList
          homepageLayouts={homepageLayouts}
          onToggleActive={
            handleToggleHomepageLayoutActive
          }
          onReorder={handleReorderHomepageLayout}
          onDelete={handleDeleteHomepageLayout}
        />
      </CMSPageLayout>
      {/*  // </div> */}
    </>
  );
}
