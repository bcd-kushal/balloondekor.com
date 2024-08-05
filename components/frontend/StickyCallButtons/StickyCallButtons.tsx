"use client";
import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";
import {
  PhoneSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allowedStickyButtonRoutes } from "./helpers/disallowedRoutes";
import { isRouteAllowed } from "./helpers/isRouteAllowed";

export default function StickyCallButtons() {
  const currPath = usePathname();

  return (
    <div className="sticky w-fit bottom-[82px] sm:bottom-[50px] translate-x-[calc(100dvw_-_60px)] sm:translate-x-[calc(100dvw_-_64px)] min-[1220px]:translate-x-[1152px] z-[1000] flex flex-col items-end justify-end gap-[14px]">
      {/* =========================================================================================================== */}
      {/* ====[ CALL US ]============================================================================================ */}
      {isRouteAllowed(
        allowedStickyButtonRoutes.call,
        currPath
      ) ? (
        <Link
          href={COMPANY_MOBILE_NO}
          prefetch
          className="aspect-square cursor-pointer w-[50px] sm:w-[50px] relative rounded-full bg-amber-500 text-white flex items-center justify-center"
        >
          <PhoneSVG
            dimensions={17}
            className="scale-[1.3] sm:scale-150"
          />
        </Link>
      ) : (
        <></>
      )}

      {/* =============================================================================================================== */}
      {/* ====[ WHATSAPP US ]============================================================================================ */}
      {isRouteAllowed(
        allowedStickyButtonRoutes.whatsapp,
        currPath
      ) ? (
        <div
          onClick={whatsappContactFromNav}
          className="aspect-square cursor-pointer w-[50px] sm:w-[50px] relative rounded-full bg-green-600 text-white flex items-center justify-center"
        >
          <WhatsappSVG
            dimensions={21}
            className="scale-150 sm:scale-[1.65]"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
