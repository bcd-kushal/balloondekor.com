/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

// components
import Button from "../Button";
import SelectImageInput from "./SelectImageInput";

// styles
import styles from "./linkImageEditor.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { LinkImageDocument } from "@/schemas/cms/serviceCategory";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialQuickLinkValue =
  (): Partial<LinkImageDocument> => ({
    _id: uuid(),
    label: "",
    url: "",
    image: {} as ImageDocument
  });

export default function QuickLinkEditor({
  srNo,
  initialValue = getInitialQuickLinkValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<LinkImageDocument>;
  setValue: (value: LinkImageDocument) => void;
  onDelete: () => void;
}) {
  const [quickLinkValue, setQuickLinkValue] =
    useState<Partial<LinkImageDocument>>(
      initialValue
    );

  const handleLabelChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;

    setQuickLinkValue((prevQuickLinkValue) => ({
      ...prevQuickLinkValue,
      label: value
    }));
  };

  const handleUrlChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;

    setQuickLinkValue((prevQuickLinkValue) => ({
      ...prevQuickLinkValue,
      url: value
    }));
  };

  const handleImageChange = (
    value: string
  ): void => {
    setQuickLinkValue((prevQuickLinkValue) => ({
      ...prevQuickLinkValue,
      image: value
    }));
  };

  useEffect(() => {
    setValue(quickLinkValue as LinkImageDocument);
  }, [quickLinkValue]);

  return (
    <div className={styles.container}>
      <span className={styles.srNoContainer}>
        {`${srNo + 1}.`}
      </span>
      <div className={styles.imageInputContainer}>
        <SelectImageInput
          title=""
          name="image"
          isRequired={false}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          defaultValue={
            (
              quickLinkValue?.image as ImageDocument
            )?._id
              ? [
                  quickLinkValue.image as ImageDocument
                ]
              : []
          }
          resetValue={false}
          setValue={(values) =>
            handleImageChange(values[0])
          }
        />
      </div>
      <div className={styles.inputsContainer}>
        <input
          className={`w-full py-4 px-5 text-[14px] transition-all duration-300 border-[1.5px] hover:border-black/70 focus:outline-blue-400 focus:outline-4 focus:outline-offset-2 border-black/30 bg-transparent rounded-xl`}
          type="text"
          name="label"
          placeholder="Label"
          value={quickLinkValue.label}
          onChange={handleLabelChange}
        />
        <input
          className={`w-full py-4 px-5 text-[14px] transition-all duration-300 border-[1.5px] hover:border-black/70 focus:outline-blue-400 focus:outline-4 focus:outline-offset-2 border-black/30 bg-transparent rounded-xl`}
          type="text"
          name="url"
          placeholder="Link"
          value={quickLinkValue.url}
          onChange={handleUrlChange}
        />
      </div>
      <span
        onClick={onDelete}
        className="p-5 group rounded-full transition-colors duration-300 cursor-pointer hover:bg-red-700"
      >
        <BinSVG
          dimensions={20}
          stroke="#900000"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </span>
    </div>
  );
}
