"use client";

// LIBRARIES
import { useState } from "react";

// COMPONENTS
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

// STYLES
import styles from "./actions.module.css";

// EXPORT
export default function Actions({
  id,
  editBtnSlug,
  deleteModalLabel,
  onDelete
}: {
  id: string;
  editBtnSlug: string;
  deleteModalLabel: string;
  onDelete: (id: string) => void;
}) {
  // states
  const [showModal, setShowModal] =
    useState<boolean>(false);

  // event handlers
  const handleDelete = () => {
    setShowModal(false);
    onDelete(id);
  };

  // RETURN COMPONENT
  return (
    <div className={styles.container}>
      {showModal ? (
        <Modal
          title={`Delete ${deleteModalLabel}?`}
          onCancel={() => setShowModal(false)}
          onAction={handleDelete}
        />
      ) : (
        <></>
      )}
      <Button
        type="icon"
        label=""
        variant="link"
        href={`/cms/${editBtnSlug}/edit/${id}`}
        iconSrc="/icons/edit-icon.svg"
        iconSize={30}
      />
      <Button
        type="icon"
        label=""
        variant="normal"
        onClick={() => {
          setShowModal(true);
        }}
        iconSrc="/icons/delete-icon.svg"
        iconSize={30}
      />
    </div>
  );
}
