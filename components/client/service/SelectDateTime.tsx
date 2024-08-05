"use client";

// libraries
import { SetStateAction, useState } from "react";

// components
import SelectDateTimeLogic from "./SelectDateTimeLogic";
import SelectDateTimeUI from "@/components/ui/service/info/order/date-time/SelectDateTimeUI";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import {
  Dialog,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DateTimeType } from "@/components/ui/service/info/Info";

export const get12HRFormat = (
  timeStr: string
) => {
  if (!timeStr) return "";
  const time = parseInt(timeStr);
  if (time < 12) return `${time}am`;
  if (time > 12) return `${time - 12}pm`;
  return `${time}noon`;
};

export default function SelectDateTime({
  service,
  dateTime,
  isMobile,
  whatsappUrl,
  setDateTimeState,
  setDateTime
}: {
  service: ServiceDocument;
  dateTime: DateTimeType;
  isMobile: boolean;
  whatsappUrl: string;
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
  return (
    <Dialog>
      <DialogTrigger className="w-full outline-none">
        <SelectDateTimeUI
          onClick={() => {}}
          selectedDateTime={{
            date: dateTime.date,
            time: `${get12HRFormat(dateTime.startTime.split(":")[0])} - ${get12HRFormat(dateTime.endTime.split(":")[0])}`
          }}
        />
      </DialogTrigger>
      <DialogContent className=" w-fit max-w-[90dvw]">
        <SelectDateTimeLogic
          service={service}
          isMobile={isMobile}
          whatsappUrl={whatsappUrl}
          onClose={() => {}}
          setDateTimeState={setDateTimeState}
          setDateTime={setDateTime}
        />
      </DialogContent>
    </Dialog>
  );
}
