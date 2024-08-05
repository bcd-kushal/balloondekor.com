"use client";

import { useState } from "react";

import Collapsable from "@/components/client/service/Collapsable";
import OffersModal from "@/components/ui/service/info/OffersModal";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

export default function Offers({
  title,
  modalTitle,
  offers
}: {
  title: string;
  modalTitle: string;
  offers: {
    label: string;
    condition: string;
    code: string;
    details: string[];
  }[];
}) {
  const [showModal, setShowModal] =
    useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* OFFERS UI THAT SHOWS UP =================== */}
        <Collapsable
          radiusAmount="0rem 0rem 1rem 1rem"
          heading={title}
          headingIconSrc="/icons/offers-icon.svg"
          headingIconAlt="Includes Icon"
          collapseIconSrc="/icons/down-icon.svg"
          notCollapseIconSrc="/icons/up-icon.svg"
          collapseIconAlt="Collapse Icon"
          onClick={() => {}}
          isCollapsedProp={true}
        />
      </DialogTrigger>
      <DialogContent className="min-w-fit rounded-3xl px-0 sm:px-[12px] pt-[2px] sm:pt-[18px] pb-0">
        {/* POPUP CARD CONTENT ========================= */}
        {/* <OffersModal
          title={modalTitle}
          offers={offers}
          hideModal={() => {}}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
