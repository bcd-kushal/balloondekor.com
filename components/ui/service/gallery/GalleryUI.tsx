// components
import Canvas from "@/components/ui/service/gallery/canvas/Canvas";
import Modal from "@/components/ui/service/gallery/modal/Modal";
import Thumbnails from "@/components/ui/service/gallery/thumbnails/Thumbnails";

// styles
import styles from "@/components/ui/service/gallery/galleryUI.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";

export default function GalleryUI({
  showModal,
  isMobile,
  images,
  activeImageIndex,
  suggestions,
  onChangeShowModal,
  onChangeActiveImageIndex,
  onShowSuggestion
}: {
  showModal: boolean;
  isMobile: boolean;
  images: ImageDocument[];
  activeImageIndex: number;
  suggestions: ServiceDocument[];
  onChangeShowModal: (showModal: boolean) => void;
  onChangeActiveImageIndex: (
    idex: number
  ) => void;
  onShowSuggestion: () => void;
}) {
  return (
    <section className={styles.container}>
      {showModal && (
        <Modal
          images={images}
          currentIndex={activeImageIndex}
          onChangeIndex={onChangeActiveImageIndex}
          onClose={() => {
            onChangeShowModal(false);
          }}
        />
      )}
      <Thumbnails
        images={images}
        activeIndex={activeImageIndex}
        onChangeActiveIndex={
          onChangeActiveImageIndex
        }
        handleShowModal={() => {
          onChangeShowModal(true);
        }}
        hasMoreData={{
          images: images,
          activeImageIndex: activeImageIndex,
          onChangeIndex: onChangeActiveImageIndex
        }}
      />
      <Canvas
        images={images}
        activeIndex={activeImageIndex}
        suggestions={suggestions}
        isMobile={isMobile}
        onChangeActiveIndex={
          onChangeActiveImageIndex
        }
        onShowModal={() => {
          onChangeShowModal(true);
        }}
        onShowSuggestion={onShowSuggestion}
      />
    </section>
  );
}
