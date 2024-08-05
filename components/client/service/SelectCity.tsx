// libraries
import { SetStateAction, useState } from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import CityModal from "@/components/client/CityModal";
import SelectCityUI from "@/components/ui/service/info/order/SelectCityUI";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

export default function SelectCity({
  isDateTimeSelected,
  isCitySelected,
  setDateTimeState,
  setCityState
}: {
  isDateTimeSelected: boolean;
  isCitySelected: boolean;
  setDateTimeState: React.Dispatch<
    SetStateAction<boolean>
  >;
  setCityState: React.Dispatch<
    SetStateAction<boolean>
  >;
}) {
  const { currentCity } = useCityContext();

  const [showCityModal, setShowCityModal] =
    useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full outline-none">
          {/* BUTTON SELECTION ================ */}
          <SelectCityUI
            activeCityName={currentCity?.name}
            onClick={() => {
              setShowCityModal(true);
            }}
          />
        </DialogTrigger>
        <DialogContent className="w-fit min-w-[450px] p-0 max-w-[95dvw]">
          {/* CARD CONTENT ==================== */}
          <CityModal
            isDateTimeSelected={
              isDateTimeSelected
            }
            isCitySelected={isCitySelected}
            type="dialog"
            setDateTimeState={setDateTimeState}
            setCityState={setCityState}
            onClose={() => {
              setShowCityModal(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
