"use client";

// libraries
import { SetStateAction, useEffect } from "react";

// components
import SelectDateTimeLogic from "./SelectDateTimeLogic";
import SelectDateTimeUI from "@/components/ui/service/info/order/date-time/SelectDateTimeUI";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { DateTimeType } from "@/components/ui/service/info/Info";
import { get12HRFormat } from "./SelectDateTime";

export default function SelectDateTimeDrawer({
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
    <Drawer>
      <DrawerTrigger asChild>
        <SelectDateTimeUI
          onClick={() => {}}
          selectedDateTime={{
            date: dateTime.date,
            time: `${get12HRFormat(dateTime.startTime.split(":")[0])} - ${get12HRFormat(dateTime.endTime.split(":")[0])}`
          }}
        />
      </DrawerTrigger>
      <DrawerContent className="min-h-fit pt-[20px] outline-none">
        <SelectDateTimeLogic
          service={service}
          isMobile={isMobile}
          isDrawer={true}
          whatsappUrl={whatsappUrl}
          onClose={() => {}}
          setDateTimeState={setDateTimeState}
          setDateTime={setDateTime}
        />
        <DrawerClose />
      </DrawerContent>
    </Drawer>
  );
}
