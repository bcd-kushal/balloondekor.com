"use client";

import { freshCartItems } from "@/components/cms/header/ui/Actions";
import Auth from "@/components/ui/auth/Auth";
import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";

import {
  CartSVG,
  HomeSVG,
  PhoneSVG,
  UserSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const isRouteDisallowed = (
  currPath: string,
  disallowedRoutes: string[]
) => {
  if (disallowedRoutes.includes(currPath))
    return true;

  for (
    let i = 0;
    i < disallowedRoutes.length;
    i++
  ) {
    if (currPath.startsWith(disallowedRoutes[i]))
      return true;
  }

  return false;
};

export default function BottomStickyNavBar() {
  const currPath = usePathname();
  const {
    status: {
      data: { isLoggedIn }
    },
    customer: {
      data: { info: customerInfo }
    },
    cart: {
      data: { items: totalCartItems }
    }
  } = useCustomerContext();

  const [showLoginDialog, setShowLoginDialog] =
    useState<boolean>(false);

  const disallowedRoutes = [
    "/cart",
    "/cms",
    "/services"
  ];

  const links = [
    {
      label: "Home",
      svg: <HomeSVG dimensions={19} />,
      type: "link",
      link: "/",
      isCurrRoute: currPath === "/" ? true : false
    },
    {
      label: "Cart",
      svg: <CartSVG dimensions={19} />,
      type: "link",
      link: "/cart",
      isCurrRoute: currPath.includes("/cart")
        ? true
        : false
    },
    {
      label:
        isLoggedIn && customerInfo !== null
          ? customerInfo?.name
            ? customerInfo?.name?.split(" ")[0]
                .length > 6
              ? `${customerInfo?.name?.split(" ")[0].substring(0, 6)}...`
              : customerInfo?.name?.split(" ")[0]
            : "User"
          : "Login",
      svg:
        isLoggedIn && customerInfo !== null ? (
          <div className="relative aspect-square w-[20px]">
            <div className="aspect-square rounded-full scale-[1.45] flex items-center justify-center text-center text-white w-[20px] bg-pink-500/80 -translate-y-[1px]">
              {(
                (customerInfo?.name ||
                  "User")[0] as string
              ).toUpperCase()}
            </div>
          </div>
        ) : (
          <UserSVG dimensions={20} />
        ),
      type:
        isLoggedIn && customerInfo !== null
          ? "link"
          : "action",
      link: "/dashboard",
      action: () =>
        setShowLoginDialog((prev) => true),
      isCurrRoute:
        isLoggedIn && customerInfo !== null
          ? currPath.includes("/dashboard")
            ? true
            : false
          : false
    },
    {
      label: "Call",
      svg: <PhoneSVG dimensions={19} />,
      type: "link",
      link: COMPANY_MOBILE_NO
    },
    {
      label: "Whatsapp",
      svg: (
        <span className="scale-[1.4] w-[19px] h-[19px] overflow-hidden">
          <WhatsappSVG dimensions={19} />
        </span>
      ),
      type: "link",
      link: whatsappContactFromNav(),
      target: "_blank"
    }
  ];

  return (
    <>
      <div
        className={
          isRouteDisallowed(
            currPath,
            disallowedRoutes
          )
            ? "hidden"
            : "sticky bottom-0 w-screen min-[768px]:hidden bg-white z-[999] text-[13px] border-t-[1px] border-zinc-400 pt-[10px] px-[14px] grid grid-cols-5 gap-[8px] *:pb-[3.5px] *:flex *:flex-col *:items-center *:justify-center *:gap-[3px]"
        }
      >
        {links.map(
          (
            {
              label,
              svg,
              link,
              type,
              action,
              isCurrRoute,
              target
            },
            index
          ) =>
            type === "link" ? (
              <Link
                href={link}
                prefetch
                className={`border-b-[4px] relative ${isCurrRoute ? "text-pink-600 border-pink-600" : "border-transparent"}`}
                key={index}
                target={target ? target : "_self"}
              >
                {svg}
                <span className="flex items-center gap-[3px]">
                  <span>{label}</span>
                  {index === 1 &&
                  freshCartItems(totalCartItems) >
                    0 ? (
                    <span className="absolute right-1/2 translate-x-[calc(50%_+_17px)] -top-[6px] rounded-full bg-pink-400 text-white text-[10px] leading-none font-semibold aspect-square w-[16px] flex items-center justify-center">
                      {freshCartItems(
                        totalCartItems
                      )}
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
              </Link>
            ) : (
              <div
                key={index}
                onClick={action}
                className={`cursor-pointer relative border-b-[4px] ${isCurrRoute ? " border-pink-600" : "border-transparent"}`}
              >
                {svg}
                <span>{label}</span>
              </div>
            )
        )}
      </div>

      {/* USER LOGIN DIALOG =================================== */}
      <Auth
        showDialog={showLoginDialog}
        onDialogClose={() => {
          setShowLoginDialog((prev) => !prev);
        }}
        isDialogClosed={!showLoginDialog}
      />
    </>
  );
}
