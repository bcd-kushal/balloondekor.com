// libraries
import Image from "next/image";

// components
import Addons from "@/components/ui/service/addons/Addons";
import Categories from "@/components/ui/service/addons/Categories";

// styles
import styles from "@/components/ui/service/addons/addonsUI.module.css";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { CartDetailsType } from "../../transaction/static/types";
import { DialogClose } from "../../dialog";

export default function AddonsUI({
  heading,
  priceDetails,
  categories,
  activeCategoryIndex,
  addons,
  overallData,
  confirmBtnMsg,
  onChangeActiveCategoryIndex,
  onGetAddonSelectionCount,
  onSetAddonSelectionCount,
  saveToCart
}: {
  heading: string;
  priceDetails: {
    servicePrice: number;
    addonsPrice: number;
  };
  categories: string[];
  activeCategoryIndex: number;
  addons: AddonDocument[];
  overallData: CartDetailsType | undefined;
  confirmBtnMsg: string;
  onChangeActiveCategoryIndex: (
    index: number
  ) => void;
  onGetAddonSelectionCount: (
    addonId: string
  ) => number;
  onSetAddonSelectionCount: (
    addonId: string,
    count: number
  ) => void;
  saveToCart: () => void;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {heading}
      </div>
      <Categories
        categories={categories}
        activeCategoryIndex={activeCategoryIndex}
        onChangeActiveCategoryIndex={
          onChangeActiveCategoryIndex
        }
      />
      <Addons
        addons={addons}
        onGetCount={onGetAddonSelectionCount}
        onChangeCount={onSetAddonSelectionCount}
      />
      <section className={styles.footer}>
        <section className={styles.price}>
          <span className="text-[16px] sm:text-[24px]">
            ₹{priceDetails.servicePrice}
            {priceDetails.addonsPrice > 0
              ? ` + ₹
          ${priceDetails.addonsPrice}`
              : ""}
          </span>
          <span
            className={
              priceDetails.addonsPrice > 0
                ? "text-[22px] sm:text-[24px] text-purple-950 font-semibold sm:pl-2"
                : "hidden"
            }
          >
            = ₹
            {priceDetails.servicePrice +
              priceDetails.addonsPrice}
          </span>
        </section>
        <section className={styles.actions}>
          <DialogClose>
            <div
              className={styles.btn}
              onClick={saveToCart}
            >
              {confirmBtnMsg}
            </div>
          </DialogClose>
        </section>
      </section>
    </section>
  );
}
