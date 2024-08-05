/* eslint-disable react-hooks/exhaustive-deps */

import { CartDetailsType } from "@/components/ui/transaction/static/types";
import Image from "next/image";

export default function CheckoutOrderDetails({
  cartDetails
}: {
  cartDetails: CartDetailsType[];
}) {
  return (
    <>
      <span className="capitalize text-[22px] pt-8 pb-2 sm:pl-[20px] px-[14px]">
        Order Summary
      </span>

      <section className="w-full flex flex-col items-stretch justify-start gap-8 sm:max-h-[270px] sm:mb-10 px-[14px] max-sm:mt-4 max-sm:mb-20 sm:p-5 scrollbar-hide sm:overflow-y-scroll h-fit sm:translate-x-[10px]">
        {cartDetails.map(
          (
            {
              addons,
              eventDate,
              eventTime,
              pricePerUnit,
              serviceImage,
              serviceName,
              totalUnits,
              customVariant
            },
            index
          ) => (
            <OrderSummaryTemplate
              img={
                customVariant && customVariant.img
                  ? {
                      url: customVariant.img.src,
                      alt: customVariant.img.alt
                    }
                  : serviceImage
              }
              title={
                customVariant
                  ? `${serviceName} (${customVariant.label})`
                  : serviceName
              }
              date={String(eventDate)}
              time={eventTime}
              totalPrice={
                totalUnits * pricePerUnit
              }
              totalAddons={addons.length}
              serviceQuantity={totalUnits}
              key={index}
            />
          )
        )}
      </section>
    </>
  );
}

const OrderSummaryTemplate = ({
  img: { url, alt },
  title,
  date,
  time,
  totalPrice,
  totalAddons,
  serviceQuantity
}: {
  img: { alt: string; url: string };
  title: string;
  date: string;
  time: string;
  totalPrice: number;
  totalAddons: number;
  serviceQuantity: number;
}) => {
  return (
    <section
      className="rounded-2xl px-5 py-5 grid grid-cols-[85px_auto] gap-5"
      style={{
        boxShadow: "0 0 10px 5px #12121215"
      }}
    >
      <div className="rounded-xl overflow-hidden object-cover aspect-square">
        <Image
          src={url}
          alt={alt}
          height={85}
          width={85}
          unoptimized
          priority
        />
      </div>
      <span className="flex flex-col justify-start gap-2 items-stretch w-full">
        <span className=" line-clamp-1 text-[20px] max-sm:text-[18.5px] text-pink-950 overflow-hidden">
          {title} x{serviceQuantity}
        </span>

        <span className="flex items-start justify-between gap-3 pt-1">
          <span className="text-[22px] max-sm:text-[20px] font-medium -mt-2">
            ₹ {totalPrice}
          </span>
        </span>

        <span className="flex flex-col gap-1 items-start justify-start max-sm:text-[16px]">
          <span className="grid grid-cols-[65px_auto] items-center justify-center gap-2">
            <span>Date:</span>
            <span>{date}</span>
          </span>
          <span className="grid grid-cols-[65px_auto] items-center justify-center gap-2">
            <span>Time:</span>
            <span>{time}</span>
          </span>
          {totalAddons > 0 ? (
            <span className="grid grid-cols-[65px_auto] items-center justify-center gap-2">
              <span>Addons:</span>
              <span>{totalAddons}</span>
            </span>
          ) : (
            <></>
          )}
        </span>
      </span>
    </section>
  );
};
