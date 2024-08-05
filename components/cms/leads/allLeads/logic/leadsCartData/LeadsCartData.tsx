import { getCityWisePrice } from "@/lib/sortServices";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { ImageDocument } from "@/schemas/cms/image";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { ServiceDocument } from "@/schemas/cms/service";
import moment from "moment";
import Image from "next/image";

export default function LeadsCartData({
  cart,
  city
}: {
  cart: Partial<LineItemDocument>[];
  city: string;
}) {
  return (
    <section className="rounded-2xl bg-white py-12 px-8 sm:p-8 gap-12 md:gap-8 text-[16px] overflow-y-scroll scrollbar-hide outline-none w-[96dvw] sm:w-[85dvw] lg:w-[60dvw] max-md:max-h-[90dvh] max-h-[85dvh] flex flex-col">
      {/* CART ITEMS ==================================================== */}
      <div className="max-h-[400px] flex flex-col justify-start items-stretch gap-6 overflow-scroll scrollbar-hide">
        <span className="text-4xl sm:text-3xl font-medium capitalize">
          Cart Items
        </span>
        <div className="min-w-[600px] relative grid grid-cols-[1fr_2.5fr_5fr_2.5fr_2.5fr_4fr] *:flex *:items-center">
          <span className="sticky top-0 bg-black text-white py-2 rounded-l-xl text-center justify-center">
            Sl.
          </span>
          <span className="sticky top-0 bg-black text-white py-2"></span>
          <span className="sticky top-0 bg-black text-white py-2">
            Service
          </span>
          <span className="sticky top-0 bg-black text-white py-2 text-center justify-center">
            Quantity
          </span>
          <span className="sticky top-0 bg-black text-white py-2 text-center justify-center">
            Price
          </span>
          <span className="sticky top-0 bg-black text-white py-2 rounded-r-xl text-center justify-center">
            Date
          </span>

          {cart.map((cartItem, index) => (
            <>
              <span className="py-[8px] text-center justify-center border-b-[1px] border-neutral-400">
                {index + 1}
              </span>
              <span className="py-[8px] justify-center border-b-[1px] border-neutral-400">
                <div className="rounded-xl aspect-square relative w-[60px] overflow-hidden ">
                  <Image
                    alt={
                      (
                        (
                          cartItem.service as ServiceDocument
                        ).media
                          .primary as ImageDocument
                      ).alt
                    }
                    src={
                      (
                        (
                          cartItem.service as ServiceDocument
                        ).media
                          .primary as ImageDocument
                      ).url
                    }
                    width={60}
                    height={60}
                    priority
                    unoptimized
                    className="object-cover object-center w-full h-full"
                    draggable={false}
                  />
                </div>
              </span>
              <span className="py-[8px] line-clamp-2 border-b-[1px] border-neutral-400">
                {
                  (
                    cartItem.service as ServiceDocument
                  ).name
                }
              </span>
              <span className="py-[8px] text-center justify-center border-b-[1px] border-neutral-400">
                {cartItem.quantity ||
                  "__undefined__"}
              </span>
              <span className="py-[8px] text-center justify-center border-b-[1px] border-neutral-400">
                ₹
                {getCityWisePrice({
                  currCity: city,
                  prices: (
                    cartItem.service as ServiceDocument
                  ).price
                })}
              </span>
              <span className="py-[8px] flex-col text-center justify-center border-b-[1px] border-neutral-400">
                {moment(
                  cartItem.eventDate as Date
                ).format("DD MMM, YYYY")}
                {
                  <span className="text-[13px] text-zinc-600">
                    (
                    {
                      // (
                      //   cartItem.decorationTime
                      //     ?.timeSlot as TimeSlotDocument
                      // ).label
                      (
                        cartItem.decorationTime
                          ?.type as DeliveryTypeDocument
                      ).timeSlots.find(
                        ({ _id }) =>
                          _id ===
                          (cartItem.decorationTime
                            ?.timeSlot as string)
                      )?.label || ""
                    }
                    )
                  </span>
                }
              </span>
            </>
          ))}
        </div>
      </div>

      {/* CART SUMMARY ================================================== */}
      {/* <div className="max-h-[400px] flex flex-col justify-start items-stretch gap-6 overflow-scroll scrollbar-hide">
        <span className="text-4xl sm:text-3xl font-medium capitalize">
          Cart Summary
        </span>
      </div> */}
    </section>
  );
}
