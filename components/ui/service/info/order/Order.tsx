/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// components
import SelectCity from "@/components/client/service/SelectCity";
import SelectDateTime from "@/components/client/service/SelectDateTime";

// styles
import styles from "@/components/ui/service/info/order/order.module.css";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import SelectCityDrawer from "@/components/client/service/SelectCityDrawer";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import SelectDateTimeDrawer from "@/components/client/service/SelectDateTimeDrawer";
import { DateTimeType } from "../Info";

export default function Order({
  service,
  dateTime,
  isDateTimeSelected,
  isCitySelected,
  whatsappUrl,
  onClickBuy,
  setDateTimeState,
  setCityState,
  setDateTime
}: {
  service: ServiceDocument;
  dateTime: DateTimeType;
  isDateTimeSelected: boolean;
  isCitySelected: boolean;
  whatsappUrl: string;
  onClickBuy: () => void;
  setDateTimeState: React.Dispatch<
    SetStateAction<boolean>
  >;
  setCityState: React.Dispatch<
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
  const [
    isMobileDimension,
    setIsMobileDimension
  ] = useState<boolean>(false);

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

  return (
    <section
      className={styles.container}
      id="__dateTimeCitySelectArea__"
    >
      {isMobileDimension ? (
        <SelectCityDrawer
          isDateTimeSelected={isDateTimeSelected}
          isCitySelected={isCitySelected}
          setDateTimeState={setDateTimeState}
          setCityState={setCityState}
        />
      ) : (
        <SelectCity
          isDateTimeSelected={isDateTimeSelected}
          isCitySelected={isCitySelected}
          setDateTimeState={setDateTimeState}
          setCityState={setCityState}
        />
      )}
      {isMobileDimension ? (
        <SelectDateTimeDrawer
          service={service}
          dateTime={dateTime}
          isMobile={isMobileDimension}
          whatsappUrl={whatsappUrl}
          setDateTimeState={setDateTimeState}
          setDateTime={setDateTime}
        />
      ) : (
        <SelectDateTime
          service={service}
          dateTime={dateTime}
          isMobile={isMobileDimension}
          whatsappUrl={whatsappUrl}
          setDateTimeState={setDateTimeState}
          setDateTime={setDateTime}
        />
      )}
    </section>
  );
}
