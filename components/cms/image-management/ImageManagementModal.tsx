import Backdrop from "@/components/common/Backdrop";
import ImageManagement from "@/components/cms/image-management/ImageManagement";

import styles from "@/components/cms/image-management/imageManagementModal.module.css";

import { ImageDocument } from "@/schemas/cms/image";

export default function ImageManagementModal({
  onClose,
  onSelect,
  multiple
}: {
  onClose: () => void;
  onSelect: (
    selectedImages: ImageDocument[]
  ) => void;
  multiple?: boolean;
}) {
  return (
    <Backdrop onClick={onClose}>
      <section className={styles.container}>
        <ImageManagement
          isModal
          onClose={onClose}
          onSelect={onSelect}
          multiple={multiple}
        />
      </section>
    </Backdrop>
  );
}
