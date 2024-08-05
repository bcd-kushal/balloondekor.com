/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useImageManagementContext } from "@/hooks/useImageManagementContext";

import ImageComp from "./Image";
import Button from "@/components/common/Button";
import Paginate from "@/components/common/Paginate";
import UploadEditor from "./UploadEditor";

import { ImageDocument } from "@/schemas/cms/image";

import styles from "./images.module.css";
import {
  AddImgSVG,
  SortAZSVG
} from "@/constants/svgs/svg";

export default function Images({
  isModal,
  onClose = () => {},
  onSelect = () => {},
  multiple
}: {
  isModal?: boolean;
  onClose?: () => void;
  onSelect?: (
    selectedImages: ImageDocument[]
  ) => void;
  multiple?: boolean;
}) {
  const {
    folder: { active: activeFolder },
    image: {
      images,
      active: activeImage,
      selected,
      paginate: { count, offset, reset },
      orderByDesc
    }
  } = useImageManagementContext();

  const [showUpload, setShowUpload] =
    useState<boolean>(false);

  const handleClose = () => {
    selected.set([]);
    onClose();
  };

  const handleSelect = () => {
    onSelect(selected.val);
    onClose();
  };

  return (
    <div
      className={`bg-backdrop-primary h-full relative flex flex-col items-stretch justify-start  ${isModal && !activeImage?.val?.name ? styles.isModal : ""}`}
    >
      {showUpload ? (
        <UploadEditor
          onClose={() => setShowUpload(false)}
        />
      ) : (
        <>
          <div className="flex items-start justify-between px-[20px]">
            <div
              className={`flex flex-col justify-start items-start gap-[4px] pb-[16px] pt-[52px]`}
            >
              <h4 className="text-[40px] tracking-[-1.6px] font-normal text-[#121212] capitalize">
                {`${activeFolder?.val?.label || "All"}`}
              </h4>
              <div className="text-[14px] mt-[-5px] text-[#12121280]">
                Showing images under this folder
              </div>
            </div>
            <div className="flex flex-col items-end justify-center h-full pt-6">
              <div className="flex items-center justify-start gap-[8px] my-[4px] *:rounded-lg *:py-[8px] *:text-[14px] *:flex *:text-white *:items-center *:justify-center *:gap-[8px] *:duration-300 *:transition-colors">
                <div
                  onClick={() =>
                    setShowUpload(true)
                  }
                  className="px-[16px] h-[36px] bg-[#121212] text-white border-[1px] border-[#121212] cursor-pointer"
                >
                  <AddImgSVG dimensions={17} />{" "}
                  Add Image
                </div>
                <div
                  onClick={() =>
                    orderByDesc.set(
                      !orderByDesc.val
                    )
                  }
                  className="h-[36px] aspect-square bg-[#41414125] border-[1px] border-[#12121260] cursor-pointer"
                >
                  <SortAZSVG
                    stroke="#121212"
                    dimensions={17}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`pt-[12px] pb-[72px] relative overflow-y-scroll scrollbar-hide grid gap-[12px] grid-cols-6 px-[20px] items-start justify-start ${activeImage?.val?.name ? styles.lessSpace : ""}`}
          >
            {images.val.map((image) => (
              <ImageComp
                key={image._id}
                image={image}
                multiple={multiple}
              />
            ))}
          </div>
          <div
            className={`flex items-center ${isModal ? "justify-between flex-row-reverse w-full" : "justify-end"} py-[8px] border-t-[1.5px] border-[#12122120] px-[20px] absolute bottom-0 w-full bg-backdrop-primary z-20`}
          >
            <Paginate
              count={count}
              limit={30}
              setOffset={offset.set}
              reset={reset.val}
              setReset={reset.set}
            />

            {isModal && (
              <div
                className={`flex gap-[8px] items-center justify-start flex-row-reverse`}
              >
                <Button
                  type="secondary"
                  label="close"
                  variant="normal"
                  onClick={handleClose}
                />
                <Button
                  type="primary"
                  label="done"
                  variant="normal"
                  onClick={handleSelect}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
