/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import moment from "moment";

// components
import Button, {
  SaveDateTimeButton
} from "@/components/ui/service/info/order/date-time/Button";
import DeliverySlots from "@/components/ui/service/info/order/date-time/DeliverySlots";
import SelectDate from "@/components/client/service/SelectDate";
import Support from "@/components/ui/service/info/order/date-time/Support";
import TimeSlots from "@/components/ui/service/info/order/date-time/TimeSlots";

// styles
import styles from "@/components/ui/service/info/order/date-time/selectDateTimeLogic.module.css";

// types
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import {
  DeliverySlotDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { DrawerClose } from "@/components/ui/drawer";
import {
  ChevronLeftSVG,
  CrossSVG
} from "@/constants/svgs/svg";
import { DialogClose } from "@/components/ui/dialog";

type MonthName =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export default function SelectDateTimeLogic({
  service,
  isMobile,
  isDrawer,
  whatsappUrl,
  onClose,
  setDateTimeState,
  setDateTime
}: {
  service: ServiceDocument;
  isMobile: boolean;
  isDrawer?: boolean;
  whatsappUrl: string;
  onClose: () => void;
  setDateTimeState: React.Dispatch<
    SetStateAction<boolean>
  >;
  setDateTime: React.Dispatch<
    SetStateAction<{
      date: string;
      startTime: string;
      endTime: string;
      type: string;
    }>
  >;
}) {
  const now = new Date();

  if (now.getMinutes()) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    now.setSeconds(0);
  }

  const startDate: Date = new Date(
    now.getTime() +
      (
        service.deliveryTime
          .orderProcessingTime as OrderProcessingTimeDocument
      ).time *
        60 *
        60 *
        1000
  );
  const startHours: number = startDate.getHours();

  const [isSelected, setIsSelected] =
    useState<boolean>(false);
  const [date, setDate] =
    useState<Date>(startDate);
  const [deliverySlots, setDeliverySlots] =
    useState<DeliverySlotDocument[]>([]);
  const [timeSlots, setTimeSlots] = useState<
    TimeSlotDocument[]
  >([]);

  const [deliverySlotId, setDeliverySlotId] =
    useState<string>("");
  const [timeSlotId, setTimeSlotId] =
    useState<string>("");

  const [deliverySlot, setDeliverySlot] =
    useState<DeliverySlotDocument | undefined>();
  const [timeSlot, setTimeSlot] = useState<
    TimeSlotDocument | undefined
  >();

  const handleSelectDate = (date: Date) => {
    if (
      !isSelected &&
      date.getDate() === startDate.getDate() &&
      date.getMonth() === startDate.getMonth() &&
      date.getFullYear() ===
        startDate.getFullYear()
    ) {
      const availableDeliverySlots =
        service.deliveryTime.deliverySlots.filter(
          (deliverySlot) =>
            getValidTimeSlots(deliverySlot).length
        );

      setDeliverySlots(availableDeliverySlots);

      if (availableDeliverySlots.length === 1) {
        setDeliverySlotId(
          availableDeliverySlots[0]._id
        );
      }
    }

    if (!isSelected) {
      setIsSelected(true);
    }

    setDate(date);
  };

  const getValidTimeSlots = (
    deliverySlot: DeliverySlotDocument
  ) => {
    const availableTimeSlots =
      deliverySlot.timeSlots;

    return (
      deliverySlot.deliveryType as DeliveryTypeDocument
    ).timeSlots.filter(
      ({ _id, startTime, endTime }) =>
        date.getDate() === startDate.getDate() &&
        date.getMonth() ===
          startDate.getMonth() &&
        date.getFullYear() ===
          startDate.getFullYear()
          ? availableTimeSlots.includes(_id) &&
            (Number(startTime.split(":")[0]) >=
              startHours ||
              Number(endTime.split(":")[0]) >=
                startHours)
          : availableTimeSlots.includes(_id)
    );
  };

  const getCleanDate = (date: Date) => {
    const monthName: MonthName[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth =
      month < 10 ? "0" + month : month % 100;
    var formattedYear = year;

    var dateString =
      formattedDay +
      " " +
      monthName[Number(formattedMonth) - 1] +
      " " +
      formattedYear;
    return dateString;
  };

  useEffect(() => {
    setDeliverySlot(
      service.deliveryTime.deliverySlots.find(
        ({ _id }) => _id === deliverySlotId
      )
    );
    setTimeSlotId("");
  }, [deliverySlotId]);

  useEffect(() => {
    setTimeSlot(
      timeSlots.find(
        ({ _id }) => _id === timeSlotId
      )
    );
    const timeList = deliverySlot
      ? "timeSlots" in deliverySlot?.deliveryType
        ? deliverySlot?.deliveryType.timeSlots
        : []
      : [];
    const requiredList = timeList
      .filter(
        (item) => item["_id"] === timeSlotId
      )
      .map((item) => {
        return {
          start: item.startTime,
          end: item.endTime
        };
      });
    setDateTime((prev) => {
      return {
        ...prev,
        startTime: requiredList.length
          ? requiredList[0].start
          : "",
        endTime: requiredList.length
          ? requiredList[0].end
          : ""
      };
    });
  }, [timeSlotId]);

  useEffect(() => {
    const availableDeliverySlots =
      service.deliveryTime.deliverySlots.filter(
        (deliverySlot) =>
          getValidTimeSlots(deliverySlot).length
      );

    setDeliverySlots(availableDeliverySlots);

    if (
      isSelected &&
      availableDeliverySlots.length === 1
    ) {
      setDeliverySlotId(
        availableDeliverySlots[0]._id
      );
    }

    setDateTime((prev) => {
      return {
        ...prev,
        date: getCleanDate(date)
      };
    });
  }, [date]);

  useEffect(() => {
    if (deliverySlot) {
      setTimeSlots(
        getValidTimeSlots(deliverySlot)
      );

      setDateTime((prev) => {
        return {
          ...prev,
          type:
            "name" in deliverySlot.deliveryType
              ? deliverySlot.deliveryType.name
              : ""
        };
      });
    } else {
      setTimeSlots([]);
    }
  }, [date, deliverySlot]);

  useEffect(() => {
    setDateTimeState((prev) =>
      deliverySlotId && timeSlotId && date
        ? true
        : false
    );
  }, [
    deliverySlotId,
    timeSlotId,
    isSelected,
    date
  ]);

  return (
    <section className={styles.container}>
      {isDrawer ? (
        <DrawerClose asChild>
          <span className={styles.closeIcon}>
            <CrossSVG dimensions={22} />
          </span>
        </DrawerClose>
      ) : (
        <></>
      )}
      <div
        className={`cursor-pointer p-3 rounded-full transition-all duration-300 absolute  left-2 sm:left-0 ${isMobile ? "top-3" : "hover:bg-black/15 top-5"}`}
        onClick={() => {
          if (timeSlotId) {
            setTimeSlotId("");
            setDeliverySlotId("");

            if (deliverySlots.length === 1) {
              setIsSelected(false);
              setDate(startDate);
            }
          } else if (deliverySlotId) {
            setDeliverySlotId("");

            if (deliverySlots.length === 1) {
              setIsSelected(false);
              setDate(startDate);
            }
          } else if (isSelected) {
            setIsSelected(false);
          }
        }}
      >
        <ChevronLeftSVG stroke="#0007" />
      </div>
      <span className="w-full flex flex-col items-stretch justify-start gap-[10px] ">
        {!isSelected && (
          <SelectDate
            heading={"Event Date"}
            isSelected={isSelected}
            startDate={startDate}
            selectedDate={date}
            isMobile={isMobile}
            onSelect={handleSelectDate}
          />
        )}
        {isSelected && !deliverySlotId && (
          <DeliverySlots
            heading={"Slot Type"}
            deliverySlots={deliverySlots}
            selected={deliverySlotId}
            onSelect={setDeliverySlotId}
          />
        )}
        {isSelected && deliverySlotId && (
          <TimeSlots
            heading={"Time Slot"}
            timeSlots={timeSlots}
            selected={timeSlotId}
            onSelect={setTimeSlotId}
          />
        )}
      </span>

      <span className="w-full border-t-[1px] border-[#0002] pt-[10px] flex flex-col items-stretch justify-end gap-[10px] min-h-[137px]">
        {
          <div className="flex items-center justify-center gap-3 w-full ">
            {isSelected ||
            (timeSlot && deliverySlot) ? (
              <span className="text-2xl font-semibold text-[#37373799] hidden sm:block">
                Delivery on
              </span>
            ) : (
              <></>
            )}

            <span
              className={`${isSelected ? "bg-[#00aa0020] text-[#00aa00] font-semibold text-2xl py-[8px] px-[12px] rounded-2xl" : "hidden"}`}
            >
              {isSelected
                ? `${moment(date).format("Do MMM YYYY")}`
                : ""}
            </span>
            {timeSlot && deliverySlotId ? (
              <span className="text-2xl font-semibold text-[#37373799]">
                at
              </span>
            ) : (
              <></>
            )}
            <span
              className={`${timeSlot && deliverySlot ? "bg-[#00aa0020] text-[#00aa00] font-semibold text-2xl py-[8px] px-[12px] rounded-2xl" : "hidden"}`}
            >
              {timeSlot && deliverySlot
                ? `${timeSlot ? `${timeSlot.startTime} to ${timeSlot.endTime} ${isMobile || 3 > 0 ? "" : `(${(deliverySlot?.deliveryType as DeliveryTypeDocument).name})`} ` : ""}`
                : ""}
            </span>
          </div>
        }
        {isMobile ? (
          <DrawerClose>
            <SaveDateTimeButton
              label={"Save"}
              isDisabled={!timeSlotId}
            />
          </DrawerClose>
        ) : (
          <DialogClose>
            <SaveDateTimeButton
              label={"Save"}
              isDisabled={!timeSlotId}
            />
          </DialogClose>
        )}
        <Support />
      </span>
    </section>
  );
}
