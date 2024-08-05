/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import NavLinkInput from "./NavLinkInput";

import {
  NestedLinkDocument,
  NestedSectionDocument
} from "@/schemas/cms/navLink";

import styles from "@/components/common/form/navSectionEditor.module.css";
import {
  BinSVG,
  PlusSVG
} from "@/constants/svgs/svg";

export const getInitialNavSectionValue =
  (): Partial<NestedSectionDocument> => ({
    _id: uuid(),
    heading: "",
    nestedLinks: []
  });

export default function NavSectionEditor({
  srNo,
  initialValue = getInitialNavSectionValue(),
  disableTag,
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<NestedSectionDocument>;
  disableTag?: boolean;
  setValue: (
    value: NestedSectionDocument
  ) => void;
  onDelete: () => void;
}) {
  const [navSectionValue, setNavSectionValue] =
    useState<Partial<NestedSectionDocument>>(
      initialValue
    );

  const handleHeadingChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setNavSectionValue((prevQuickLinkValue) => ({
      ...prevQuickLinkValue,
      heading: value
    }));
  };

  const handleNestedLinksChange = (
    value: NestedLinkDocument[]
  ): void => {
    setNavSectionValue((prevNavSectionValue) => ({
      ...prevNavSectionValue,
      nestedLinks: value
    }));
  };

  useEffect(() => {
    setValue(
      navSectionValue as NestedSectionDocument
    );
  }, [navSectionValue]);

  return (
    <>
      <span
        className={`sticky top-0 py-[8px] px-[12px] bg-gray-300 flex items-center justify-between z-50`}
      >
        <span
          className={`capitalize font-medium text-[18px]`}
        >{`section ${srNo + 1}`}</span>
        <div className="flex items-center justify-end gap-5">
          <span
            onClick={() => {}}
            className="py-[7px] px-[10px] flex items-center gap-3 text-[14px] rounded-xl border-[1.5px] border-[#0008] text-black/95 bg-[#aa000000] transition-all duration-300 hover:bg-black hover:text-white hover:stroke-white cursor-pointer"
          >
            <PlusSVG dimensions={14} />
            Add link
          </span>
          <span
            onClick={onDelete}
            className="py-[7px] px-[10px] flex items-center gap-3 text-[14px] rounded-xl border-[1.5px] border-[#aa000065] text-red-600 bg-[#aa000020] transition-all duration-300 hover:bg-red-600 hover:text-white hover:stroke-white cursor-pointer"
          >
            <BinSVG dimensions={14} />
            Delete
          </span>
        </div>
      </span>
      <div
        className={`px-[12px] pb-[16px] flex flex-col items-stretch justify-start gap-4`}
      >
        <input
          className={`text-[16px] py-[10px] px-[16px] border-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 focus:outline-sky-400 focus:outline-offset-2 focus:outline-4 rounded-xl bg-transparent w-full`}
          type="text"
          name="heading"
          placeholder="Heading"
          value={navSectionValue.heading}
          onChange={handleHeadingChange}
        />
        <NavLinkInput
          title="links"
          isRequired={false}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          defaultValue={
            (
              navSectionValue.nestedLinks as NestedLinkDocument[]
            ).length
              ? [
                  ...(navSectionValue.nestedLinks as NestedLinkDocument[])
                ]
              : []
          }
          disableTag={disableTag}
          setValue={(nestedLinks) =>
            handleNestedLinksChange(nestedLinks)
          }
        />
      </div>
    </>
  );
}
