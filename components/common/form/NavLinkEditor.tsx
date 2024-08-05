/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";

import {
  NestedLinkDocument,
  TagDocument
} from "@/schemas/cms/navLink";

import styles from "@/components/common/form/navLinkEditor.module.css";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialNavLinkValue =
  (): Partial<NestedLinkDocument> => ({
    _id: uuid(),
    label: "",
    url: "",
    tag: {
      label: "",
      color: ""
    } as TagDocument
  });

export default function NavLinkEditor({
  srNo,
  initialValue = getInitialNavLinkValue(),
  disableTag,
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<NestedLinkDocument>;
  disableTag?: boolean;
  setValue: (value: NestedLinkDocument) => void;
  onDelete: () => void;
}) {
  const [navLinkValue, setNavLinkValue] =
    useState<Partial<NestedLinkDocument>>(
      initialValue
    );

  const handleLabelChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setNavLinkValue((prevNavLinkValue) => ({
      ...prevNavLinkValue,
      label: value
    }));
  };

  const handleUrlChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setNavLinkValue((prevNavLinkValue) => ({
      ...prevNavLinkValue,
      url: value
    }));
  };

  const handleTagLabelChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setNavLinkValue((prevNavLinkValue) => ({
      ...prevNavLinkValue,
      tag: {
        ...prevNavLinkValue.tag,
        label: value
      } as TagDocument
    }));
  };

  const handleTagColorChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setNavLinkValue((prevNavLinkValue) => ({
      ...prevNavLinkValue,
      tag: {
        ...prevNavLinkValue.tag,
        color: value
      } as TagDocument
    }));
  };

  useEffect(() => {
    setValue(navLinkValue as NestedLinkDocument);
  }, [navLinkValue]);

  return (
    <div className={styles.container}>
      <span className={styles.srNoContainer}>
        {`${srNo + 1}.`}
      </span>
      <div className={styles.inputsContainer}>
        <input
          className={`text-[16px] py-[10px] px-[16px] border-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 focus:outline-sky-400 focus:outline-offset-2 focus:outline-4 rounded-xl bg-transparent w-full`}
          type="text"
          name="label"
          placeholder="Label"
          value={navLinkValue.label}
          onChange={handleLabelChange}
        />
        <input
          className={`text-[16px] py-[10px] px-[16px] border-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 focus:outline-sky-400 focus:outline-offset-2 focus:outline-4 rounded-xl bg-transparent w-full`}
          type="text"
          name="url"
          placeholder="Link"
          value={navLinkValue.url}
          onChange={handleUrlChange}
        />
        {disableTag ? (
          <></>
        ) : (
          <>
            <input
              className={`border-[1.5px] border-black/30 rounded-xl px-[12px] py-[10px] text-[16px] bg-transparent outline-none focus:outline-2 focus:outline-offset-0 focus:outline-sky-400 transition-all duration-150 hover:border-black/70`}
              type="text"
              name="tagLabel"
              placeholder="tagLabel"
              value={
                navLinkValue.tag?.label || ""
              }
              onChange={handleTagLabelChange}
            />
            <input
              className={`border-[1.5px] border-black/30 rounded-xl px-[12px] py-[10px] text-[16px] bg-transparent outline-none focus:outline-2 focus:outline-offset-0 focus:outline-sky-400 transition-all duration-150 hover:border-black/70`}
              type="text"
              name="tagColor"
              placeholder="tagColor"
              value={
                navLinkValue.tag?.color || ""
              }
              onChange={handleTagColorChange}
            />
          </>
        )}
      </div>
      <span
        onClick={onDelete}
        className="p-5 cursor-pointer rounded-full transition-all duration-300 hover:bg-red-600 *:hover:stroke-white"
      >
        <BinSVG
          dimensions={18}
          stroke="#aa0000"
          className="transition-all duration-300"
        />
      </span>
    </div>
  );
}
