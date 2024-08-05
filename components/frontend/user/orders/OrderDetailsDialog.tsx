import Image from "next/image";
import OrderCompletionBadge from "./OrderCompletionBadge";
import {
  CrossSVG,
  DownloadSVG,
  TickSVG,
  TruckSVG
} from "@/constants/svgs/svg";
import { OrderDetailsServiceListType } from "./utils/types";
import { useStatusContext } from "@/hooks/useStatusContext";

export default function OrderDetailsDialog({
  deliveryAddress,
  orderHeadingData,
  pricingSummary,
  orderServiceList,
  paymentStatus,
  handleRetryPayment
}: {
  deliveryAddress: string;
  orderHeadingData: {
    orderId: string;
    city: string;
    bookedOn: string;
  };
  pricingSummary: {
    total: number;
    paid: number;
    due: number;
    coupon?: {
      code: string;
      appliedDiscount: number;
    };
  };
  orderServiceList: OrderDetailsServiceListType;
  paymentStatus: "pending" | "completed";
  handleRetryPayment: () => void;
}) {
  const { addStatus } = useStatusContext();

  // const downloadInvoice = async () => {
  //   try {
  //     const url = "";
  //     const response = await fetch(url);

  //     if (!response.ok)
  //       addStatus([
  //         {
  //           message: "Invoice generation failed",
  //           type: "error"
  //         }
  //       ]);
  //     else {
  //       const pdfData = await response.json();
  //       addStatus([
  //         {
  //           message:
  //             "Invoice generation successful!",
  //           type: "success"
  //         }
  //       ]);

  //       const link = document.createElement("a");
  //       link.href = "/invoice.pdf";
  //       link.setAttribute(
  //         "download",
  //         "invoice.pdf"
  //       );
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   } catch (err: any) {
  //     addStatus([
  //       {
  //         message:
  //           "Invoice generation from server failed",
  //         type: "error"
  //       }
  //     ]);
  //   }
  // };

  return (
    <section className="p-[14px] pt-[18px] sm:p-10 sm:pt-12 sm:rounded-2xl bg-white text-[17px] w-screen max-sm:h-[100dvh] sm:w-[65dvw] md:w-[75dvw] flex flex-col items-stretch justify-start">
      <div className="flex flex-col items-stretch justify-start gap-[2px]">
        {/* HEADING ----------------------------------------------------- */}
        <div className="flex items-center justify-start gap-[14px] max-sm:pt-[4px] max-sm:pb-[]">
          <span className="font-semibold text-[20px] sm:block hidden">
            Order details #
            {orderHeadingData.orderId}
          </span>
          <span className="font-semibold text-[20px] sm:hidden block">
            Order #{orderHeadingData.orderId}
          </span>
        </div>

        {/* DATE, CITY, PAYMENT STATUS AND INVOICE -------------------------------------------------------------- */}
        <div className="flex max-sm:flex-col gap-[2px] sm:gap-[8px] mt-[3px] relative">
          <span className="sm:bg-pink-200/70 sm:text-pink-600/80 text-[14px] sm:py-[4px] sm:px-[10px] sm:rounded-xl font-medium max-sm:text-zinc-500/80 max-sm:w-fit">
            City: {orderHeadingData.city}
          </span>
          <span className="sm:bg-pink-200/70 sm:text-pink-600/80 text-[14px] sm:py-[4px] sm:px-[10px] sm:rounded-xl font-medium max-sm:text-zinc-500/80 max-sm:w-fit">
            Booked on: {orderHeadingData.bookedOn}
          </span>

          <div className="max-sm:flex max-sm:items-center max-sm:justify-between max-sm:mt-[20px] text-[14px] ">
            {/* PAYMENT STATUS ------------------------------------------- */}
            <div className="sm:hidden ">
              {paymentStatus === "pending" ? (
                <div className="text-red-600 font-semibold flex flex-col items-start">
                  <span>Payment failed</span>
                  <span
                    className="underline underline-offset-2 cursor-pointer "
                    onClick={handleRetryPayment}
                  >
                    Retry
                  </span>
                </div>
              ) : (
                <div className="text-green-600 font-semibold text-[14px]">
                  Payment successful
                </div>
              )}
            </div>
            {/* INVOICE -------------------------------- */}
            <div
              // onClick={downloadInvoice}
              className="sm:absolute sm:right-0 transition-colors max-sm:border-neutral-300 max-sm:border-[1.5px] max-sm:rounded-xl max-sm:p-[6px] max-sm:px-[8.5px] hover:text-pink-700 cursor-pointer flex items-center justify-center gap-[6px] "
            >
              <DownloadSVG dimensions={15} />{" "}
              <span>Download invoice</span>
            </div>
          </div>
        </div>
      </div>

      {/* === [ SERVICE DATA ] ============================================================ */}
      <div className="flex flex-col items-stretch justify-start gap-[3px] mt-[16px] max-sm:max-w-[calc(100dvw_-_28px)]">
        <div className="min-h-[100px] relative flex flex-col items-stretch justify-start max-h-[calc(100dvh_-_167px)] sm:max-h-[calc(100dvh_-_208px)] max-sm:pb-[44px] overflow-y-scroll scrollbar-hide sm:*:p-[12px] ">
          {/* EACH SERVICE ITEM BILL -------------------------------------- */}
          {orderServiceList.map(
            (
              {
                img: { src, alt },
                name,
                status,
                addons,
                date,
                time,
                quantity,
                pricePerUnit
              },
              index
            ) => (
              <div
                className={`grid grid-cols-[60px_auto] sm:grid-cols-[60px_4fr_1fr_1.5fr] gap-[12px] max-sm:py-[12px] items-start sm:items-center border-t-[1.2px] border-dashed ${index !== 0 ? "border-zinc-400" : "border-transparent"}`}
                key={index}
              >
                {/* THUMBNAIL =============== */}
                <div className="aspect-square rounded-xl relative overflow-hidden bg-zinc-400 max-sm:row-span-2">
                  <Image
                    src={src}
                    alt={alt}
                    unoptimized
                    width={60}
                    height={60}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                {/* DETAILS =============== */}
                <div className="flex flex-col items-stretch justify-center">
                  <span className="text-[18px] truncate">
                    {name}
                  </span>
                  <span className="leading-[1.3] sm:leading-tight text-zinc-500 text-[15px]">
                    Quantity: x{quantity}
                  </span>
                  <span className="leading-[1.3] sm:leading-tight text-zinc-500 text-[15px]">
                    <span className="max-sm:hidden">
                      Booking for:
                    </span>{" "}
                    {date} ({time})
                  </span>
                </div>
                {/* STATUS =============== */}
                <div className="flex items-center justify-center max-sm:hidden">
                  <OrderCompletionBadge
                    status={status}
                  />
                </div>
                {/* PRICE =============== */}
                <div className="flex items-center justify-between sm:justify-end">
                  <span>
                    {" "}
                    ₹ {pricePerUnit * quantity}
                  </span>
                  <span className="scale-95 sm:hidden">
                    <OrderCompletionBadge
                      status={status}
                    />
                  </span>
                </div>

                {/* ADDONS IF ANY ================= */}
                {addons && addons.length ? (
                  <div className="col-span-2 sm:col-span-4 max-sm:my-[5px] flex items-center justify-start gap-[10px] sm:gap-[12px] scrollbar-hide overflow-x-scroll">
                    {addons.map(
                      (
                        {
                          img: {
                            src: addonSrc,
                            alt: addonAlt
                          },
                          name: addonName,
                          quantity: addonQuantity,
                          pricePerUnit:
                            addonPricePerUnit
                        },
                        addonIndex
                      ) => (
                        <div
                          className="p-[10px] rounded-xl bg-neutral-200/70 text-zinc-700 grid grid-cols-[50px_auto] gap-[10px] text-[16px] min-w-[180px] max-w-[180px]"
                          key={addonIndex}
                        >
                          <div className="aspect-square rounded-xl overflow-hidden relative bg-zinc-300">
                            <Image
                              src={addonSrc}
                              alt={addonAlt}
                              height={50}
                              width={50}
                              unoptimized
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="flex flex-col justify-start">
                            <span className="truncate line-clamp-1">
                              {addonName.length >
                              12
                                ? `${addonName.substring(0, 12)}...`
                                : addonName}
                            </span>
                            <div className="flex items-baseline justify-between">
                              <span>
                                ₹{" "}
                                {
                                  addonPricePerUnit
                                }{" "}
                                x {addonQuantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )
          )}

          {/* OVERALL FINAL PRICE -------------------------------------------------------------- */}
          <div
            className={`grid grid-cols-[1fr_1fr] relative max-sm:pt-[80px] sm:grid-cols-[60px_4fr_1fr_1.5fr] gap-[12px] items-center border-t-[1.2px] border-dashed border-zinc-400`}
          >
            <span className="max-sm:hidden sm:col-span-2 flex flex-col justify-between h-full ">
              <span className="text-[15px] grid grid-cols-[20px_auto] gap-1 items-start sm:pl-[6px]">
                <TruckSVG className="translate-y-[3px]" />
                <span>
                  Address: {deliveryAddress}
                </span>
              </span>
              {paymentStatus === "pending" ? (
                <div className="py-[3px] px-[9px] pr-[11px] text-red-600 bg-red-200/80 rounded-xl font-semibold text-[14px] flex items-center gap-[4px] w-fit">
                  <CrossSVG className="translate-y-[-1px]" />{" "}
                  <span>
                    {" "}
                    Payment failed:{" "}
                    <span
                      className="underline underline-offset-2 cursor-pointer px-[4px]"
                      onClick={handleRetryPayment}
                    >
                      {" "}
                      Retry
                    </span>
                  </span>
                </div>
              ) : (
                <div className="py-[3px] px-[9px] pr-[11px] text-green-600 bg-green-200/80 rounded-xl font-semibold text-[14px] flex items-center gap-[4px] w-fit">
                  <TickSVG /> Payment successful
                </div>
              )}
            </span>
            <span className="absolute text-zinc-500 top-0 my-[18px] text-[15px] line-clamp-2 sm:hidden">
              Delivery at: {deliveryAddress}
            </span>
            <div className="flex flex-col justify-center items-start sm:pl-[14px] gap-[3px]">
              <span className="text-[18px] font-semibold whitespace-nowrap">
                Total amount
              </span>
              {pricingSummary.coupon ? (
                <span className="text">
                  Applied Coupon{" "}
                  {/* (
                  {pricingSummary.coupon.code}) */}
                </span>
              ) : (
                <></>
              )}
              <span className="text-green-800">
                Amount Paid
              </span>
              <span className="text-red-500">
                Amount Due
              </span>
            </div>
            <div className="flex flex-col justify-center items-end gap-[3px]">
              <span className="text-[18px] font-semibold whitespace-nowrap">
                ₹ {pricingSummary.total}
              </span>
              {pricingSummary.coupon ? (
                <span className="">
                  - ₹{" "}
                  {pricingSummary.coupon
                    .appliedDiscount || 0}
                </span>
              ) : (
                <></>
              )}
              <span className="text-green-800">
                ₹ {pricingSummary.paid}
              </span>
              <span className="text-red-500">
                ₹ {pricingSummary.due}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* TABLE DATA ----------------------------------------------------- */}
    </section>
  );
}
