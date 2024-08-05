import {
  BinSVG,
  CartSVG,
  PenSVG
} from "@/constants/svgs/svg";
import {
  CartDetailsType,
  EditAddonType,
  EditCartServiceDateTimeType,
  HandleDeletionType,
  HandleInstructionManagementType,
  HandleQuantityType,
  SelectedAddonType
} from "../../../static/types";
import SelectedAddons from "./SelectedAddons";
import Image from "next/image";
import { DEFAULT_INSTRUCTIONS_PLACEHOLDER } from "../../../static/constants";
import Link from "next/link";
import { convertTo12HrsFormat } from "../../../static/utils/24to12hrsFormat";
import { useCityContext } from "@/hooks/useCityContext";
import { getCityName } from "../../../static/utils/getCityName";
import { formattedDateString } from "../../../static/utils/formattedDateString";
import { Loader2SVG } from "@/constants/svgs/svg";

export default function CartServiceList({
  cartDetails,
  setQuantity,
  handleDelete,
  editDateTime,
  cartLoading,
  setInstruction,
  editAddons
}: {
  cartDetails: CartDetailsType[];
  setQuantity: HandleQuantityType;
  handleDelete: HandleDeletionType;
  editDateTime: EditCartServiceDateTimeType;
  cartLoading: boolean;
  setInstruction: HandleInstructionManagementType;
  editAddons: EditAddonType;
}) {
  const { currentCity } = useCityContext();

  return (
    <main
      className={
        cartDetails.length === 0
          ? "sm:col-span-2"
          : "min-h-fit sm:min-h-screen sm:w-[68%] min-[1199px]:w-[800px] flex flex-col items-stretch justify-start gap-[28px] pt-[20px] pr-[10px] sm:pb-[40px] max-[1199px]:pl-[10px]"
      }
    >
      {cartDetails.length ? (
        cartDetails.map(
          (
            {
              serviceId,
              serviceName,
              serviceImage,
              pricePerUnit,
              totalUnits,
              eventDate,
              eventTime,
              instruction,
              addons,
              customVariant
            },
            index
          ) => (
            <section
              key={index}
              className=" rounded-xl p-[12px] sm:p-[18px]"
              style={{
                boxShadow:
                  "0 0 10px 5px #12121218"
              }}
            >
              <section className="flex items-stretch justify-stretch gap-5 sm:gap-5">
                {/* Image container ------ */}
                <Link
                  href={`/services/${serviceName.split(/\s+/g).join("-").toLowerCase()}`}
                  prefetch
                  className={`object-cover overflow-hidden rounded-xl max-[360px]:h-[100px] max-[360px]:w-[100px] w-[120px] h-[120px] sm:w-[230px] sm:h-[230px]`}
                >
                  <Image
                    alt={
                      customVariant &&
                      customVariant.img
                        ? customVariant.img.alt
                        : serviceImage.alt
                    }
                    src={
                      customVariant &&
                      customVariant.img
                        ? customVariant.img.src
                        : serviceImage.url
                    }
                    height={230}
                    width={230}
                    unoptimized
                    priority
                  />
                </Link>
                <div className="*:h-fit max-[360px]:w-[calc(100%_-_110px)] w-[calc(100%_-_130px)] sm:w-[calc(100%_-_240px)] grid grid-cols-[auto_100px] auto-rows-max relative">
                  {/* title... */}
                  <span className="flex justify-start col-span-2 sm:col-span-1 font-normal text-[20px] sm:text-[24px] text-[#333]">
                    <span className="line-clamp-2 leading-tight">
                      {serviceName}{" "}
                      {customVariant
                        ? `(${customVariant.label}) `
                        : ""}
                      <span className="text-pink-600">
                        x {totalUnits}
                      </span>
                    </span>
                  </span>
                  {/* add-remove more... */}
                  <span className="hidden sm:flex">
                    <ToggleServiceQuantity
                      serviceId={serviceId}
                      relatedDate={formattedDateString(
                        eventDate
                      )}
                      totalUnits={totalUnits}
                      setQuantity={setQuantity}
                    />
                  </span>
                  {/* price... */}
                  <span className="text-pink-700 font-normal text-[18px] sm:text-[20px] col-span-2 mt-2 sm:mt-0">
                    ₹ {pricePerUnit * totalUnits}
                  </span>
                  <span className="col-span-2 py-1 mt-[10px] sm:mt-[12px] capitalize flex items-center justify-between">
                    <span className="flex items-center justify-start gap-1 max-[340px]:text-[15px]">
                      <span className="max-[340px]:w-[47px] w-[60px]">
                        Date:
                      </span>
                      <span>
                        {String(eventDate)}
                      </span>
                    </span>
                    <div className="grid *:row-start-1 *:col-start-1">
                      <span
                        className="hidden sm:block cursor-pointer text-green-800 text-[14px]"
                        onClick={() =>
                          editDateTime.editDate(
                            serviceId,
                            formattedDateString(
                              eventDate
                            ),
                            serviceName,
                            String(eventDate)
                          )
                        }
                      >
                        Change date
                      </span>
                      <span
                        className="sm:hidden cursor-pointer text-green-800 text-[14px] px-[8px] py-[4px] translate-x-2"
                        onClick={() =>
                          editDateTime.editDate(
                            serviceId,
                            formattedDateString(
                              eventDate
                            ),
                            serviceName,
                            String(eventDate)
                          )
                        }
                      >
                        <PenSVG />
                      </span>
                    </div>
                  </span>
                  <span className="col-span-2  capitalize flex items-center justify-between">
                    <span className="flex items-center justify-start gap-1 max-[340px]:text-[15px]">
                      <span className="max-[340px]:w-[47px] w-[60px]">
                        Time:
                      </span>
                      <div className="grid *:row-start-1 *:col-start-1">
                        <span className="hidden sm:block">
                          {eventTime}
                        </span>
                        <span className="block sm:hidden">
                          {eventTime
                            .split("-")
                            .map((date) =>
                              convertTo12HrsFormat(
                                date.trim()
                              )
                            )
                            .join(" - ")}
                        </span>
                      </div>
                    </span>
                    <div className="grid *:row-start-1 *:col-start-1">
                      <span
                        className="hidden sm:block cursor-pointer text-green-800 text-[14px]"
                        onClick={() =>
                          editDateTime.editTime(
                            serviceId,
                            formattedDateString(
                              eventDate
                            ),
                            serviceName,
                            String(eventDate),
                            eventTime
                          )
                        }
                      >
                        Change time
                      </span>
                      <span
                        className="sm:hidden cursor-pointer text-green-800 text-[14px] px-[8px] py-[4px] translate-x-2"
                        onClick={() =>
                          editDateTime.editTime(
                            serviceId,
                            formattedDateString(
                              eventDate
                            ),
                            serviceName,
                            String(eventDate),
                            eventTime
                          )
                        }
                      >
                        <PenSVG />
                      </span>
                    </div>
                  </span>
                  <span className="col-span-2 py-1 capitalize flex items-center justify-between">
                    <span className="flex items-center justify-start gap-1">
                      <span className="max-[340px]:w-[47px] w-[60px] max-[340px]:text-[15px]">
                        City:
                      </span>
                      <span
                        className={`capitalize max-[340px]:text-[15px] ${getCityName(currentCity) === null ? "text-red-600" : ""}`}
                      >
                        {getCityName(
                          currentCity
                        ) || "No city selected"}
                      </span>
                    </span>
                  </span>
                  <span className="text-[13px] mt-[12px] mb-[16px] sm:hidden *:whitespace-nowrap col-span-2 py-1 capitalize flex items-center justify-between">
                    <InstructionComponent
                      serviceId={serviceId}
                      relatedDate={formattedDateString(
                        eventDate
                      )}
                      instruction={instruction}
                      dimensions={12}
                      setInstruction={
                        setInstruction
                      }
                    />
                  </span>
                  <span className="hidden col-span-2 sm:flex items-center justify-between mt-[20px] gap-5">
                    <InstructionComponent
                      serviceId={serviceId}
                      relatedDate={formattedDateString(
                        eventDate
                      )}
                      instruction={instruction}
                      setInstruction={
                        setInstruction
                      }
                    />
                    <RemoveServiceBtn
                      serviceId={serviceId}
                      relatedDate={formattedDateString(
                        eventDate
                      )}
                      handleDelete={handleDelete}
                    />
                  </span>
                </div>
              </section>
              <div className="w-full grid grid-cols-2 gap-5 sm:hidden">
                <RemoveServiceBtn
                  serviceId={serviceId}
                  relatedDate={formattedDateString(
                    eventDate
                  )}
                  handleDelete={handleDelete}
                />
                <span className="flex sm:hidden w-full">
                  <ToggleServiceQuantity
                    serviceId={serviceId}
                    relatedDate={formattedDateString(
                      eventDate
                    )}
                    totalUnits={totalUnits}
                    setQuantity={setQuantity}
                  />
                </span>
              </div>
              <SelectedAddons
                list={addons}
                serviceId={serviceId}
                relatedDate={formattedDateString(
                  eventDate
                )}
                setQuantity={setQuantity.addon}
                handleDelete={handleDelete.addon}
                handleAddMoreAddons={editAddons}
              />
            </section>
          )
        )
      ) : cartLoading ? (
        <div className="flex flex-col text-[#858585] animate-pulse items-center justify-center gap-6 text-[18px] h-[calc(100dvh_-_250px)] w-[1200px] max-[1199px]:w-screen">
          <Loader2SVG
            dimensions={56}
            className="animate-spin"
          />
          <span>Loading cart</span>
        </div>
      ) : (
        <div className="flex flex-col text-[#858585] items-center justify-center gap-0 text-[16px] sm:text-[18px] h-[calc(100dvh_-_250px)] w-[1200px] max-[1199px]:w-screen">
          <Image
            src={"/images/empty-bag.png"}
            alt=""
            width={120}
            height={120}
            unoptimized
            className="pb-8 hue-rotate-[39deg] max-sm:scale-90"
          />
          <span className="">
            Oh no, your cart feels empty.
          </span>
          <span className="">
            Sprinkle some magic with our{" "}
            <span className="text-[#6f4c65]">
              beautiful decor.
            </span>
          </span>
          <Link
            href={"/"}
            prefetch
            className="mt-20 text-[16px] rounded-xl py-4 px-7 text-white bg-[#876065] hover:bg-[#6f4a4f] transition-colors duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      )}
    </main>
  );
}

const InstructionComponent = ({
  serviceId,
  relatedDate,
  instruction,
  dimensions,
  setInstruction
}: {
  serviceId: string;
  relatedDate: string;
  instruction?: string;
  dimensions?: number | string;
  setInstruction: HandleInstructionManagementType;
}) => {
  return (
    <span
      className="flex items-start justify-start gap-3 text-slate-500 transition-all duration-200 hover:text-slate-800 cursor-pointer w-full"
      onClick={() =>
        setInstruction(
          serviceId,
          relatedDate,
          instruction,
          instruction
        )
      }
    >
      <PenSVG
        dimensions={dimensions || 16}
        className="translate-y-[1.5px]"
      />
      <span className="line-clamp-2 w-[calc(100%_-_32px)] leading-tight text-[15px]">
        {instruction
          ? instruction
          : DEFAULT_INSTRUCTIONS_PLACEHOLDER}
      </span>
    </span>
  );
};

const RemoveServiceBtn = ({
  handleDelete,
  serviceId,
  relatedDate
}: {
  handleDelete: HandleDeletionType;
  serviceId: string;
  relatedDate: string;
}) => {
  return (
    <div
      className="border-[1.5px] border-red-400 sm:border-red-500 text-red-400 sm:text-red-500 flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer py-2 px-4 rounded-lg hover:text-white hover:bg-red-500"
      onClick={() =>
        handleDelete.service(
          serviceId,
          relatedDate
        )
      }
    >
      <BinSVG />
      Remove
    </div>
  );
};

const ToggleServiceQuantity = ({
  totalUnits,
  serviceId,
  relatedDate,
  setQuantity
}: {
  totalUnits: number;
  serviceId: string;
  relatedDate: string;
  setQuantity: HandleQuantityType;
}) => {
  return (
    <span className="flex items-center justify-between *:px-2 text-[18px] bg-pink-600 sm:bg-pink-100 rounded-lg text-white sm:text-pink-600 border-pink-600 font-normal border-[1.5px] py-1 px-4 sm:p-2 w-full">
      <span
        className="cursor-pointer text-[22px] sm:text-[18px]"
        onClick={() =>
          setQuantity.service(
            serviceId,
            relatedDate,
            Math.max(1, totalUnits - 1)
          )
        }
      >
        -
      </span>
      <span>{totalUnits}</span>
      <span
        className="cursor-pointer text-[22px] sm:text-[18px]"
        onClick={() =>
          setQuantity.service(
            serviceId,
            relatedDate,
            totalUnits + 1
          )
        }
      >
        +
      </span>
    </span>
  );
};
