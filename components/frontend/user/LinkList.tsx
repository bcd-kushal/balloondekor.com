"use client";

import { SetStateAction } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter
} from "next/navigation";

import { useCustomerContext } from "@/hooks/useCustomerContext";

import {
  CodeSandboxLogoIcon,
  ExitIcon,
  GearIcon,
  PersonIcon
} from "@radix-ui/react-icons";

const validRoute = (a: string, b: string) =>
  a.trim().toLowerCase() ===
  b.trim().toLowerCase();

export default function LinkList({
  index,
  setIndex
}: {
  index?: number;
  setIndex?: React.Dispatch<
    SetStateAction<number>
  >;
}) {
  const currPath = usePathname();
  const { push } = useRouter();

  const {
    auth: {
      action: {
        password: { logout }
      }
    },
    customer: {
      data: { info: userInfo }
    }
  } = useCustomerContext();

  const userLinks = [
    {
      label: "Account",
      svg: (
        <PersonIcon
          width={20}
          height={20}
        />
      ),
      link: "/user/settings"
    },
    {
      label: "Orders",
      svg: (
        <CodeSandboxLogoIcon
          width={20}
          height={20}
        />
      ),
      link: "/user/orders"
    },
    ...(userInfo?.password
      ? [
          {
            label: "Change Password",
            svg: (
              <GearIcon
                width={20}
                height={20}
              />
            ),
            link: "/user/change-password"
          }
        ]
      : [])
  ];

  const handleLogout = () => {
    push("/");
    logout();
  };

  return (
    <>
      {userInfo ? (
        <section className="sticky top-0 hidden sm:flex flex-col items-stretch justify-start gap-[7px] pr-[14px] sm:border-r-[1.5px] border-black/30 ">
          <div className="flex items-center justify-start gap-[14px] p-6 pl-2 mb-4">
            <div className="rounded-full aspect-square w-[52px] flex items-center justify-center text-[18px] bg-gradient-to-br from-pink-300/60 to-pink-600/85 text-white">
              {userInfo.name
                ? userInfo.name[0].toUpperCase()
                : ""}
            </div>
            <div className="flex flex-col items-start justify-center gap-[2px]">
              <span className="text-[22px] font-medium leading-[1.18]  line-clamp-2">
                {userInfo.name?.split(" ")[0]}
              </span>
              <span className="text-[14px] text-neutral-800">
                {userInfo.mobileNumber}
              </span>
            </div>
          </div>
          {index === undefined ||
          setIndex === undefined
            ? userLinks.map(
                ({ label, svg, link }, i) => (
                  <Link
                    href={link}
                    className={`flex items-center justify-start gap-[14px] px-[14px] py-[12px] rounded-xl transition-all duration-300 ${validRoute(currPath, link) ? "bg-pink-300/40 text-pink-950" : "text-black hover:text-pink-950 hover:bg-zinc-400/20"}`}
                    prefetch
                    key={i}
                  >
                    {svg}
                    <span>{label}</span>
                  </Link>
                )
              )
            : userLinks.map(
                ({ label, svg }, i) => (
                  <div
                    onClick={() =>
                      setIndex((prev) => i)
                    }
                    className={`flex items-center justify-start gap-[14px] px-[14px] py-[12px] rounded-xl transition-all duration-300 ${i === index ? "bg-pink-300/40 text-pink-950" : "text-black hover:text-pink-950 hover:bg-zinc-400/20"} cursor-pointer`}
                    key={i}
                  >
                    {svg}
                    <span>{label}</span>
                  </div>
                )
              )}
          <div
            onClick={handleLogout}
            className={`flex items-center justify-start gap-[14px] px-[14px] py-[12px] rounded-xl transition-all duration-300 text-red-500 bg-transparent hover:bg-red-100 cursor-pointer`}
          >
            <ExitIcon
              width={18}
              height={18}
            />
            <span>Logout</span>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export function LinksOnMobile({
  index,
  setIndex
}: {
  index?: number;
  setIndex?: React.Dispatch<
    SetStateAction<number>
  >;
}) {
  const currPath = usePathname();
  const { push } = useRouter();

  const {
    auth: {
      action: {
        password: { logout }
      }
    },
    customer: {
      data: { info: userInfo }
    }
  } = useCustomerContext();

  const userLinks = [
    {
      label: "Account",
      svg: (
        <PersonIcon
          width={20}
          height={20}
        />
      ),
      link: "/user/settings"
    },
    {
      label: "Orders",
      svg: (
        <CodeSandboxLogoIcon
          width={20}
          height={20}
        />
      ),
      link: "/user/orders"
    },
    ...(userInfo?.password
      ? [
          {
            label: "Change Password",
            svg: (
              <GearIcon
                width={20}
                height={20}
              />
            ),
            link: "/user/change-password"
          }
        ]
      : [])
  ];

  const handleLogout = () => {
    push("/");
    logout();
  };

  return (
    <>
      {userInfo ? (
        <div className="sticky top-[-118px] z-[999] w-screen bg-white pt-[5px] border-b-[1px] border-black/30 flex flex-col items-stretch justify-start gap-[8px] sm:hidden">
          <div className="flex flex-col items-center justify-center gap-[2px]">
            <span className="text-[20px] font-medium">
              {userInfo.name}
            </span>
            <span className="text-[14px] text-neutral-700">
              {userInfo.mobileNumber}
            </span>
            <div
              onClick={handleLogout}
              className="py-[6px] px-[14px] rounded-xl text-red-500 bg-red-200/60 my-4 text-[15px] flex items-center justify-center cursor-pointer gap-[5px] transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <ExitIcon
                width={14}
                height={14}
              />
              Logout
            </div>
          </div>
          <div className="flex items-center justify-evenly overflow-x-scroll scrollbar-hide gap-[8px] translate-y-[1px]">
            {userLinks.map(
              ({ label, svg, link }, i) =>
                index === undefined ||
                setIndex === undefined ? (
                  <Link
                    href={link}
                    className={`flex flex-col items-center justify-evenly min-[470px]:w-[156px] py-[8px] transition-all duration-300 px-[14px] border-b-[3px] ${validRoute(currPath, link) ? "border-pink-500 text-pink-500" : "border-transparent text-black"}`}
                    prefetch
                    key={i}
                  >
                    <span className="text-[16px] whitespace-nowrap">
                      {label}
                    </span>
                  </Link>
                ) : (
                  <div
                    className={`flex flex-col items-center cursor-pointer justify-evenly min-[470px]:w-[156px] py-[8px] transition-all duration-300 px-[14px] border-b-[3px] ${index === i ? "border-pink-500 text-pink-500" : "border-transparent text-black"}`}
                    key={`_${i}_`}
                    onClick={() =>
                      setIndex((prev) => i)
                    }
                  >
                    <span className="text-[16px] whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
