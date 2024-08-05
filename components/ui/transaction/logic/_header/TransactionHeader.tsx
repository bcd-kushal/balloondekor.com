import {
  ArrowLeftIcon,
  MobileIcon
} from "@radix-ui/react-icons";
import {
  CartProgressType,
  NavigationType
} from "../../static/types";
import { DisplayCurrentTransactionProgress } from "./scraps/DisplayCurrentTransactionPage";
import {
  MAX_TRANSACTION_DISTINCT_PAGES,
  headerTitle
} from "../../static/constants";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import Link from "next/link";
import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import {
  PhoneSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";

export default function TransactionHeader({
  transactionProgressData,
  handleNavigation,
  currPageIndex
}: {
  transactionProgressData: CartProgressType;
  handleNavigation: NavigationType;
  currPageIndex: number;
}) {
  const [showHelpDialog, setShowHelpDialog] =
    useState<boolean>(false);

  return (
    <>
      <nav className="col-start-1 col-end-3 h-fit pt-7 pb-3 px-3 max-sm:px-[14px] border-b-[1px] border-black/30">
        {/* TOP ROW ============================================ */}
        <div className="flex items-center justify-between w-full">
          {/* left side ------------------------- */}
          <span className="flex items-center justify-start gap-5 text-[20px]">
            <ArrowLeftIcon
              strokeWidth={3}
              width={22}
              height={22}
              className="cursor-pointer"
              onClick={handleNavigation.goBack}
            />
            <span>
              {headerTitle[currPageIndex]} (
              {currPageIndex + 1}/
              {MAX_TRANSACTION_DISTINCT_PAGES})
            </span>
          </span>

          {/* right side ---------------------- */}
          <div className="grid *:row-start-1 *:col-start-1">
            <Drawer>
              <DrawerTrigger
                className="sm:hidden p-0 min-w-fit outline-none"
                asChild
              >
                <div className="sm:hidden cursor-pointer underline underline-offset-2">
                  Need help?
                </div>
              </DrawerTrigger>
              <DrawerContent className="p-8 pt-12 outline-none text-[16px]">
                <NeedHelpUI />
              </DrawerContent>
            </Drawer>

            <div
              className="max-sm:hidden cursor-pointer underline underline-offset-2"
              onClick={() =>
                setShowHelpDialog((prev) => true)
              }
            >
              Need help?
            </div>
          </div>
        </div>

        {/* BOTTOM ROW ============================================ */}
        <div className="flex items-stretch  justify-center mt-8 sm:mt-0 scale-[0.83] sm:scale-95">
          {transactionProgressData.map(
            (
              {
                label,
                side,
                completed,
                position
              },
              index
            ) => (
              <DisplayCurrentTransactionProgress
                label={label}
                side={side}
                completed={completed}
                position={position}
                key={index}
              />
            )
          )}
        </div>
      </nav>

      {/* DIALOG FOR NEED HELP ====================================== */}
      <Dialog
        open={showHelpDialog}
        onOpenChange={() =>
          setShowHelpDialog((prev) => !prev)
        }
      >
        <DialogContent className="min-w-fit p-0 bg-transparent border-none outline-none">
          <div className="min-w-fit text-[16px] bg-white p-10 px-7 rounded-2xl">
            <NeedHelpUI />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const NeedHelpUI = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-[5px]">
      <span></span>
      <span className="font-medium text-[22px]">
        Need help?
      </span>
      <span className="text-zinc-600 w-[80%] text-[15px] text-center leading-tight">
        Talk to our experts
      </span>

      {/* LINKS ============================================================ */}
      <div className="flex flex-col items-stretch justify-center gap-[8px] mt-[14px]">
        {/* CALL ---------------------------------------- */}
        <Link
          href={COMPANY_MOBILE_NO}
          prefetch
          className="flex items-center justify-center gap-[8px] rounded-full bg-[#f18093] text-white py-[7px] px-[14px] min-w-[200px]"
        >
          <PhoneSVG dimensions={18} />
          <span>Call Us</span>
        </Link>

        {/* WHATSAPP ---------------------------------------- */}
        <Link
          href={whatsappContactFromNav()}
          prefetch
          className="flex items-center justify-center gap-[6px] rounded-full bg-green-500/80 text-white py-[7px] px-[14px] min-w-[200px]"
        >
          <WhatsappSVG dimensions={24} />
          <span>Whatsapp</span>
        </Link>
      </div>
    </div>
  );
};
