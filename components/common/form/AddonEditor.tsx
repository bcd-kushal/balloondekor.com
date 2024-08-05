import Image from "next/image";

import Input from "./Input";

import { AddonDocument } from "@/schemas/cms/addon";
import { ImageDocument } from "@/schemas/cms/image";
import { SelectedAddonDocument } from "@/schemas/cms/service";

import styles from "@/components/common/form/addonEditor.module.css";

export default function AddonEditor({
  addon,
  isSelected,
  isPopular,
  toggleSelect,
  togglePopular
}: {
  addon: SelectedAddonDocument;
  isSelected: boolean;
  isPopular: boolean;
  toggleSelect: () => void;
  togglePopular: () => void;
}) {
  const { name, image, price } =
    addon.addon as AddonDocument;

  const { alt, defaultAlt, url } =
    image as ImageDocument;

  const handleSelect = (value: boolean) => {
    if (
      (isSelected && !value) ||
      (!isSelected && value)
    ) {
      toggleSelect();
    }
  };

  const handlePopular = (value: boolean) => {
    if (
      (isPopular && !value) ||
      (!isPopular && value)
    ) {
      console.log("will toggle popular");
      togglePopular();
    }
  };

  return (
    <div
      className={`transition-all duration-200  flex flex-col items-center gap-3 rounded-xl justify-start p-4 ${isSelected ? "  bg-sky-300 " : "bg-zinc-200"}`}
    >
      <section
        className={`w-full flex flex-col items-stretch justify-start gap-3`}
      >
        <span className="aspect-square rounded-xl overflow-hidden w-full *:w-full *:h-full">
          <Image
            src={url}
            alt={alt || defaultAlt}
            width={160}
            height={160}
          />
        </span>

        <section
          className={`w-full flex flex-col items-stretch justify-start `}
        >
          <div
            className={`text-[15px] font-semibold truncate`}
          >
            {name}
          </div>
          <span
            className={`text-[15px] font-medium`}
          >
            {`₹ ${price}`}
          </span>
        </section>
      </section>
      <section
        className={`w-full flex items-center justify-between`}
      >
        <div
          className={`w-1/2 flex items-center justify-start gap-2 `}
        >
          <Image
            src={"/icons/selected-icon.svg"}
            alt="Selected Icon"
            width={18}
            height={18}
          />
          <div
            className={`translate-y-[-2px] ${styles.input}`}
          >
            <Input
              title=""
              name=""
              isRequired={false}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="boolean"
              defaultValue={isSelected}
              value={isSelected}
              setValue={handleSelect}
            />
          </div>
        </div>
        <div
          className={`w-1/2 flex items-center justify-end gap-2`}
        >
          <Image
            src={"/icons/popular-icon.svg"}
            alt="Popular Icon"
            width={18}
            height={18}
          />
          <div
            className={`translate-y-[-2px] ${styles.input} ${isSelected ? "" : styles.disabled}`}
          >
            <Input
              title=""
              name=""
              isRequired={false}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="boolean"
              defaultValue={isPopular}
              value={isPopular}
              setValue={handlePopular}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
