"use client";
import { useState } from "react";
import Modal from "../../Modal";
import Link from "next/link";

export type ModalType = "destructive" | "normal";
export type TableModalWrapperType = {
  label: string | JSX.Element;
  type: "link" | "action" | "none";
  onClickTrigger: () => void;
  modalTitle: string;
  href?: string;
  modalType?: ModalType;
  className?: string;
};

export function TableModalWrapperButton({
  label,
  type,
  onClickTrigger,
  modalTitle,
  href,
  modalType,
  className
}: TableModalWrapperType) {
  const [showModal, setShowModal] =
    useState<boolean>(false);

  const handleModal = () => {
    onClickTrigger();
    setShowModal(false);
    // onDelete(id);
  };

  return (
    <>
      {/* SHOW MODAL ================================================== */}
      {showModal ? (
        <Modal
          title={`${modalTitle}`}
          onCancel={() => setShowModal(false)}
          onAction={handleModal}
          triggerType={modalType || "normal"}
        />
      ) : (
        <></>
      )}
      {type === "link" ? (
        <Link
          href={href ? href : "#"}
          className={className}
        >
          {label}
        </Link>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className={className}
        >
          {label}
        </button>
      )}
    </>
  );
}
