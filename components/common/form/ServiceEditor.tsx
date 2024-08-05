// libraries
import Image from "next/image";

// components
import Input from "./Input";

// styles
import styles from "@/components/common/form/serviceEditor.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";
import { TickSVG } from "@/constants/svgs/svg";

export default function ServiceEditor({
  service,
  isSelected,
  toggleSelect
}: {
  service: ServiceDocument;
  isSelected: boolean;
  toggleSelect: () => void;
}) {
  const {
    name,
    media: { primary },
    price: {
      base: { price }
    }
  } = service;

  const { alt, defaultAlt, url } =
    primary as ImageDocument;

  const handleSelect = (value: boolean) => {
    if (
      (isSelected && !value) ||
      (!isSelected && value)
    ) {
      toggleSelect();
    }
  };

  return (
    <div
      className={`p-3 max-h-[475px] min-h-[200px] overflow-y-scroll scrollbar-hide rounded-xl flex flex-col items-center justify-between ${isSelected ? "bg-[#0088aa50]" : "bg-[#12121210]"}`}
    >
      <span className="aspect-square rounded-xl overflow-hidden flex items-center justify-center object-cover w-full ">
        <Image
          className=""
          src={url}
          alt={alt || defaultAlt}
          width={450}
          height={450}
        />
      </span>
      <h6 className="text-[15px] font-medium truncate w-full text-left my-2">
        {name}
      </h6>
      <div className="w-full flex items-center justify-between">
        <span
          className={`text-[16px] font-medium`}
        >
          {`₹ ${price}`}
        </span>
        <span className="flex items-center justify-end gap-2">
          <span>
            <TickSVG dimensions={18} />
          </span>
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
        </span>
      </div>
    </div>
  );
}
/* 
          
          
          
          
          
          <section className={styles.actions}>
      <div className={styles.action}>
        <Image
          src={"/icons/selected-icon.svg"}
          alt="Selected Icon"
          width={20}
          height={20}
        />
        <div className={styles.input}>
          
        </div>
      </div>
    </section>
    */
