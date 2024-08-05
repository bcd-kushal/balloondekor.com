"use client";

// libraries
import Image from "next/image";

// constants
import { AUTH_MESSAGES } from "@/constants/frontend/auth";

// components
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

// svgs
import {
  TickSVG,
  TwitterBadgeSVG
} from "@/constants/svgs/svg";

export default function AuthUIWrapper({
  showDialog,
  onDialogClose,
  children
}: {
  showDialog: boolean;
  onDialogClose: () => void;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={onDialogClose}
    >
      <DialogContent className="min-w-fit min-h-fit p-0 bg-transparent border-none rounded-none outline-none focus:outline-none gap-0 grid grid-rows-[75px_auto] max-sm:grid-rows-[90px_auto] max-sm:w-[100dvw] max-sm:h-[100dvh] sm:min-h-fit sm:min-w-[328px] sm:max-w-[328px]">
        <div className="text-[#cd378c] flex items-center sm:items-start bg-gradient-to-b from-pink-100 to-white to-85%  max-sm:w-[100dvw] max-sm:h-[90px] relative border-none font-medium sm:rounded-3xl sm:rounded-b-none px-9 sm:pt-14 pb-10 sm:pb-5 rounded-b-none text-[24px]">
          <Image
            className="hidden sm:block"
            src="/images/logo.webp"
            width={130}
            height={50}
            alt="Balloondekor Logo"
          />
          <Image
            className="block sm:hidden"
            src="/images/logo.webp"
            width={200}
            height={100}
            alt="Balloondekor Logo"
          />
        </div>
        <Card className="bg-white border-none max-sm:w-[100dvw] relative rounded-none sm:rounded-3xl sm:rounded-t-none rounded-t-none flex items-start justify-start overflow-hidden shadow-none -translate-y-1 max-sm:h-[calc(100dvh_-_90px)] sm:w-full">
          <Carousel
            className="max-sm:h-[calc(100dvh_-_90px)] sm:w-[328px] sm:h-full relative p-9 pt-0 max-sm:-mt-2 sm:py-0 flex flex-col justify-start max-sm:gap-8 sm:justify-between "
            disableKeyPress
            opts={{
              watchDrag: false
            }}
          >
            <div className="flex flex-col justify-start gap-2 max-sm:pb-8">
              <span className="font-medium text-[24px]">
                Login/Register
              </span>
            </div>
            <CarouselContent className="p-0 min-h-fit">
              {children}
            </CarouselContent>

            {/* Bottom Content ------------------------------------- */}
            <div className="max-sm:absolute max-sm:bottom-0 flex items-center justify-center gap-[4.5px] text-[13px] pb-[15px] max-sm:w-[calc(100dvw_-_44px)]">
              <TwitterBadgeSVG fill="#00aa00" />
              <span className="text-neutral-600/80">
                Trusted by 5 Lac+ Customers
              </span>
            </div>
          </Carousel>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
