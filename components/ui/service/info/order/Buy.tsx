/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, {
  SetStateAction,
  useEffect,
  useState
} from "react";
import { usePathname } from "next/navigation";

import styles from "@/components/ui/service/info/order/buy.module.css";
import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import AddonsModal from "@/components/client/service/AddonsModal";
import { DateTimeType } from "../Info";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@radix-ui/react-icons";

export default function Buy({
  price,
  priceRef,
  whatsappUrl,
  heading,
  addons,
  name,
  service,
  dateTime,
  addonDialogOpen,
  selectedAddons,
  navigateService,
  setAddonDialogOpen,
  setSelectedAddons,
  onClick,
  saveCart
}: {
  price: number;
  priceRef: React.RefObject<HTMLDivElement>;
  whatsappUrl: string;
  heading: string;
  addons: SelectedAddonDocument[];
  name: string;
  service: ServiceDocument;
  dateTime: DateTimeType;
  addonDialogOpen: boolean;
  selectedAddons: {
    addonId: string;
    count: number;
    pricePerUnit: number;
  }[];
  navigateService: {
    prev: string;
    next: string;
  };
  setAddonDialogOpen: React.Dispatch<
    SetStateAction<boolean>
  >;
  setSelectedAddons: React.Dispatch<
    SetStateAction<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >
  >;
  onClick: () => void;
  saveCart?: () => void;
}) {
  const [
    isMobileDimension,
    setIsMobileDimension
  ] = useState<boolean>(false);
  const [isPriceVisible, setIsPriceVisible] =
    useState<boolean>(false);
  const [btnClick, setBtnClick] =
    useState<number>(0);

  const currPath = usePathname();

  useEffect(() => {
    const checkScreen = () => {
      if (innerWidth < 480 && !isMobileDimension)
        setIsMobileDimension((prev) => true);
      if (innerWidth >= 480 && isMobileDimension)
        setIsMobileDimension((prev) => false);
    };
    addEventListener("resize", checkScreen);
    checkScreen();
    return () => {};
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPriceVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (priceRef.current) {
      observer.observe(priceRef.current);
    }

    return () => {
      if (priceRef.current) {
        observer.unobserve(priceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (btnClick > 0) {
      const dateCitySection =
        document.getElementById(
          "__dateTimeCitySelectArea__"
        );

      dateCitySection?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });

      const citySection = dateCitySection
        ?.children[0] as HTMLElement;
      setTimeout(() => {
        citySection.animate(
          {
            background: "#ee000020",
            borderWidth: "2px",
            borderColor: "#ee000060"
          },
          { duration: 300, fill: "forwards" }
        );
      }, 700);

      setTimeout(() => {
        citySection.animate(
          {
            background: "transparent",
            borderWidth: "1px",
            borderColor: "#12121225"
          },
          { duration: 300, fill: "forwards" }
        );
      }, 1500);
    }
  }, [btnClick]);

  return (
    <>
      <div className="w-full sticky bottom-[0px] max-sm:pb-[10px] max-sm:pt-[5px] sm:bottom-[8px] flex items-stretch justify-stretch gap-[7px] max-sm:px-[12px] bg-transparent">
        {/* Left side previous/next service button ---------------------- */}
        {/* <div className="flex items-stretch justify-center gap-[6px] translate-y-1 overflow-y-hidden min-w-fit">
          <Link
            href={navigateService.prev}
            prefetch
            className="bg-white grid place-items-center transition-all duration-300 pl-[14px] pr-[7px] hover:bg-black/5"
          >
            <ChevronLeftIcon
              width={20}
              height={20}
            />
          </Link>
          <Link
            href={navigateService.next}
            prefetch
            className="bg-white grid place-items-center transition-all duration-300 pl-[7px] pr-[14px] hover:bg-black/5"
          >
            <ChevronRightIcon
              width={20}
              height={20}
            />
          </Link>
        </div> */}

        {/* Book now button ---------------------- */}
        <div className={styles.container}>
          {price > 0 && !isPriceVisible ? (
            <div className={styles.priceShow}>
              ₹{price}
            </div>
          ) : (
            <></>
          )}
          <div
            className={styles.buyBtn}
            // href={whatsappUrl}
            // target="_blank"
            onClick={onClick}
          >
            <span>book now</span>
            {price > 0 && !isPriceVisible ? (
              <span className="pl-[8px] min-[769px]:hidden">
                | &nbsp; ₹{price}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Right side previous/next service button ---------------------- */}
        {/* <Link
          href={navigateService.next}
          prefetch
          className="bg-white aspect-square translate-y-1 grid place-items-center px-[8px] rounded-xl border-[1.5px] border-slate-200 transition-all duration-300 hover:bg-black/5"
        >
          <ChevronRightIcon
            width={20}
            height={20}
          />
        </Link> */}
      </div>
      <Dialog
        open={addonDialogOpen}
        onOpenChange={() =>
          setAddonDialogOpen((prev) => !prev)
        }
      >
        <DialogContent className="p-0 min-w-fit border-none outline-none bg-transparent">
          <AddonsModal
            heading={heading}
            addons={addons}
            price={price}
            serviceName={name}
            service={service}
            dateTime={dateTime}
            onSelectAddons={setSelectedAddons}
            saveCart={saveCart}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
