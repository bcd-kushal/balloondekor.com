"use client";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter
} from "next/navigation";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import Auth from "@/components/ui/auth/Auth";
import styles from "@/components/cms/header/ui/actions.module.css";
import {
  CartSVG,
  ContactUsSVG,
  SearchSVG,
  UserSVG
} from "@/constants/svgs/svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  ExitIcon,
  ListBulletIcon
} from "@radix-ui/react-icons";
import { SearchResultDataType } from "../../searchBar/logic/SearchOnType";
import { PopoverSearchBox } from "../../searchBar/logic/PopoverSearchBox";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { SearchTagsListType } from "../../searchBar/utils/types";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { isDateTimeExpired } from "@/components/ui/transaction/static/utils/isDateTimeExpired";
import { formattedDateString } from "@/components/ui/transaction/static/utils/formattedDateString";

export const freshCartItems = (
  items: LineItemDocument[]
) => {
  const freshItems = items.filter(
    ({ eventDate, _id }) =>
      !isDateTimeExpired(
        formattedDateString(eventDate),
        items,
        _id
      )
  );

  return freshItems ? freshItems.length : 0;
};

export default function Actions({
  handler,
  searchData,
  tags,
  searchValue,
  setSearchValue
}: {
  handler: () => void;
  searchData: SearchResultDataType;
  tags: SearchTagsListType;
  searchValue: string;
  setSearchValue: React.Dispatch<
    SetStateAction<string>
  >;
}) {
  const currentPath = usePathname();
  const { push } = useRouter();

  const {
    status: {
      data: { isLoggedIn, isCustomerReady }
    },
    auth: {
      action: {
        password: { logout }
      }
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
  const [showDialog, setShowDialog] =
    useState<boolean>(false);

  const handleLogout = (): void => {
    if (currentPath.includes("dashboard")) {
      push("/");
    }

    logout();
  };

  return (
    <>
      {/* USER LOGIN DIALOG =================================== */}
      <Auth
        showDialog={showLoginDialog}
        onDialogClose={() => {
          setShowLoginDialog((prev) => false);
        }}
        isDialogClosed={!showLoginDialog}
      />

      <div className={styles.container}>
        {/* CART ---------------------- */}
        <Link
          className={`hidden relative min-[786px]:flex flex-col items-center justify-center gap-1 p-3 text-[13px] text-zinc-800 capitalize cursor-pointer transition-all duration-300 hover:text-pink-600`}
          href={"/cart"}
          prefetch
        >
          <CartSVG dimensions={24} />
          <span
            className={`hidden md:block text-[13px]`}
          >
            {"cart"}
          </span>
          {freshCartItems(totalCartItems) > 0 ? (
            <span className="absolute -right-[4px] -top-[4px] rounded-full bg-pink-400 text-white text-[11px] font-semibold aspect-square w-[18px] flex items-center justify-center">
              {freshCartItems(totalCartItems)}
            </span>
          ) : (
            <></>
          )}
        </Link>

        {/* CONTACT US ---------------------- */}
        <Link
          className={`flex flex-col items-center justify-center gap-1 p-3 text-[13px] text-zinc-800 capitalize cursor-pointer transition-all duration-300 hover:text-pink-600`}
          href={"/contact-us"}
          prefetch
        >
          <ContactUsSVG dimensions={24} />
          <span
            className={`hidden md:block text-[13px]`}
          >
            {"contact"}
          </span>
        </Link>

        {/* SEARCH --------------------------------------------------------------------------- */}
        <div
          onClick={() =>
            setShowDialog((prev) => true)
          }
          className={`flex min-[786px]:hidden flex-col items-center justify-center gap-1 p-3 text-[13px] text-zinc-800 capitalize cursor-pointer transition-all duration-300 hover:text-pink-600`}
        >
          <SearchSVG dimensions={24} />
        </div>

        {/* LOGIN ---------------------- */}
        {isLoggedIn &&
        customerInfo &&
        isCustomerReady ? (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="min-w-fit p-0 min-h-fit hidden min-[786px]:block">
                <div
                  className={`group flex flex-col items-center justify-center gap-1 text-[13px] capitalize cursor-pointer transition-all duration-300 hover:text-pink-600 p-0 -translate-y-[1px]`}
                >
                  <div className="rounded-full flex items-center justify-center text-center p-2 text-white font-semibold aspect-square bg-gradient-to-br from-pink-500/40 to-pink-600/80 cursor-pointer transition-all duration-300 group-hover:to-pink-600/95">
                    {(customerInfo.name ||
                      "User")[0].toUpperCase()}
                  </div>

                  <span
                    className={`hidden md:block text-[13px] capitalize`}
                  >
                    {`Hi, ${
                      customerInfo.name?.split(
                        " "
                      )[0] || "User"
                    }`}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                collisionPadding={14}
                asChild
                className="p-0 bg-transparent min-h-fit min-w-fit text-[17px]"
              >
                <section className="flex flex-col justify-start gap-1 *:px-6 *:py-3 text-[16px] shadow-xl rounded-[12px] px-5 pb-4 pt-7 bg-white">
                  <Link
                    href={`/dashboard`}
                    prefetch
                    className="flex items-center justify-start gap-5 text-black/70 transition-all duration-300 hover:bg-neutral-200/70 rounded-xl cursor-pointer"
                  >
                    <ListBulletIcon />
                    <span>Dashboard</span>
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="flex items-center justify-start gap-5 text-red-600/80 transition-all duration-300 hover:bg-red-200/60 rounded-xl cursor-pointer"
                  >
                    <ExitIcon />
                    <span>Logout</span>
                  </span>
                </section>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div
            className={`group hidden min-[786px]:flex flex-col items-center justify-center gap-1 text-[13px] capitalize cursor-pointer transition-all duration-300 hover:text-pink-600 p-3 sm:ml-[-12px]`}
            onClick={() => {
              setShowLoginDialog(true);
            }}
          >
            <UserSVG dimensions={24} />
            <span
              className={`hidden md:block text-[13px]`}
            >
              Login
            </span>
          </div>
        )}
      </div>
      <Dialog
        open={showDialog}
        onOpenChange={() =>
          setShowDialog((prev) => !prev)
        }
      >
        {/* Input field ------------------------------------ */}
        <DialogTrigger className="min-w-fit p-0"></DialogTrigger>

        {/* Popup field ------------------------------------ */}
        <DialogContent
          onOpenAutoFocus={(e) =>
            e.preventDefault()
          }
          className="p-0 min-w-fit outline-none bg-white border-none"
        >
          <PopoverSearchBox
            inputValue={searchValue}
            setState={setSearchValue}
            searchTags={[
              {
                label: "Lorem",
                link: "#",
                svg: <></>
              }
            ]}
            searchData={searchData}
            tags={tags}
            closeSearch={() =>
              setShowDialog((prev) => !prev)
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
