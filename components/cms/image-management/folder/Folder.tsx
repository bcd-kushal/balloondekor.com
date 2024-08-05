"use client";

// libraries
import { useState } from "react";
import Image from "next/image";
import FolderImg from "../../../../public/pngs/folder.png";

import { useImageManagementContext } from "@/hooks/useImageManagementContext";

// components
import Modal from "@/components/common/Modal";

// types
import { FolderDocument } from "@/schemas/cms/folder";
import { useStatusContext } from "@/hooks/useStatusContext";

export default function Folder({
  folder,
  onEdit
}: {
  folder: FolderDocument;
  onEdit: (id: number) => void;
}) {
  const {
    folder: { active, del }
  } = useImageManagementContext();
  const { addStatus } = useStatusContext();

  const { _id, label, imageCount } = folder;

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const handleClick = () => {
    if (_id === active?.val?._id) {
      active.set("");
    } else {
      active.set(folder._id);
    }
  };

  const handleDelete = () => {
    setShowModal(false);

    if (_id === active.val._id) {
      active.set("");
    }

    del(_id);
  };

  return (
    <div
      className={` group/tab flex flex-col relative aspect-square text-[#12121290] items-center justify-between rounded-xl transition-all duration-300 cursor-pointer p-[16px] pt-[4px]  ${_id === active?.val?._id ? "bg-tab-primary text-white shadow-md shadow-[#0075FE55]" : "hover:text-tab-primary hover:bg-tab-hover"}`}
    >
      {/* show folder ===================================== */}
      <span
        className="grid w-full place-items-center"
        onClick={handleClick}
      >
        <span className="row-start-1 col-start-1">
          <Image
            alt=""
            src={FolderImg.src}
            height={FolderImg.height}
            width={FolderImg.width}
          />
        </span>
        <span className="row-start-1 col-start-1 translate-y-[6px] font-semibold text-[18px]">
          {imageCount}
        </span>
      </span>
      <div className="w-full grid *:row-start-1 *:col-start-1">
        <span className="text-center whitespace-nowrap truncate text-[14px] capitalize font-medium group-hover/tab:opacity-0 transition-all duration-150">
          {label}
        </span>
        <span className="text-center z-10 flex items-center justify-between gap-3 whitespace-nowrap truncate text-[14px] capitalize font-medium opacity-0 group-hover/tab:opacity-100 transition-all duration-150  *:py-2 *:px-3 *:rounded-lg">
          <span
            className="bg-[#0075fe30] transition-colors duration-200 hover:bg-tab-primary hover:text-white"
            onClick={() => onEdit(_id)}
          >
            Edit
          </span>
          <span
            className="bg-[#aa000030] text-[#aa0000] transition-colors duration-200 hover:bg-[#aa0000] hover:text-white"
            onClick={() => {
              if (imageCount > 0) {
                addStatus([
                  {
                    type: "error",
                    message:
                      "Cannot drop a non-empty folder"
                  }
                ]);
                return;
              }
              return setShowModal(_id);
            }}
          >
            Drop
          </span>
        </span>
      </div>

      <div
        className={`flex items-center p-[4px] gap-[4px] absolute bottom-0 right-0`}
      >
        {showModal ? (
          <Modal
            title={`Delete folder "${label[0].toUpperCase() || ""}${label.slice(1, label.length) || ""}"?`}
            onCancel={() => setShowModal(false)}
            onAction={handleDelete}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
