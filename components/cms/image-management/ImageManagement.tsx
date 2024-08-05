// hooks
import { ImageManagementContextProvider } from "@/hooks/useImageManagementContext";

// components
import Folders from "./folder/Folders";
import Images from "./image/Images";
import InfoSidebar from "./infoSidebar/InfoSidebar";

// styles
import styles from "@/components/cms/image-management/imageManagement.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";

export default function ImageManagement({
  isModal,
  onClose,
  onSelect,
  multiple
}: {
  isModal?: boolean;
  onClose?: () => void;
  onSelect?: (
    selectedImages: ImageDocument[]
  ) => void;
  multiple?: boolean;
}) {
  return (
    <div
      className={`
        h-full relative
        ${styles.container}
        ${isModal ? ` overflow-hidden ${styles.isModal}` : ""}
      `}
    >
      <ImageManagementContextProvider>
        <div
          className={`h-[calc(100dvh_-_44px)] sm:h-[calc(100dvh_-_52px)] overflow-hidden ${isModal ? "rounded-s-3xl" : ""}`}
        >
          <Folders />
        </div>
        <span className="h-[calc(100dvh_-_44px)] sm:h-[calc(100dvh_-_52px)] overflow-hidden">
          <Images
            isModal={isModal}
            onClose={onClose}
            onSelect={onSelect}
            multiple={multiple}
          />
        </span>

        <InfoSidebar />
      </ImageManagementContextProvider>
    </div>
  );
}
