/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// styles
import { PlusSVG } from "@/constants/svgs/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CMSPageLayout({
  title,
  addBtnTitle,
  noAddBtn,
  children
}: {
  title: string;
  addBtnTitle?: string;
  noAddBtn?: boolean;
  children: Readonly<React.ReactNode>;
}) {
  const currPath = usePathname();

  return (
    <div
      className={`w-full h-[calc(100dvh_-_51px)] max-h-[calc(100dvh_-_51px)] relative flex flex-col items-stretch justify-stretch overflow-y-scroll scrollbar-hide`}
    >
      {/* page header ===================== */}
      <div className="px-[20px] pt-[32px] pb-[16px] flex justify-between w-full">
        <h2 className="text-[24px] text-[#121212] capitalize">
          {title}
        </h2>
        <div className="flex items-center justify-end">
          {noAddBtn ? (
            <></>
          ) : (
            <Link
              href={`${currPath}/add`}
              className="py-[8px] px-[12px] rounded-lg bg-[#121212] text-white flex items-center justify-center gap-[8px]"
            >
              <PlusSVG className="mb-[2px]" />
              <span className="text-[14px]">
                {addBtnTitle
                  ? addBtnTitle
                  : `Add ${title}`}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* children --------------------------------- */}
      <div
        className={`h-full relative overflow-y-scroll scrollbar-hide px-5 w-full`}
      >
        {children}
      </div>
    </div>
  );
}
