// components
import Thumbnail from "@/components/ui/service/gallery/thumbnails/Thumbnail";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "@/components/ui/service/gallery/thumbnails/thumbnails.module.css";

export default function Thumbnails({
  images,
  activeIndex,
  onChangeActiveIndex,
  handleShowModal,
  hasMoreData
}: {
  images: ImageDocument[];
  activeIndex: number;
  onChangeActiveIndex: (index: number) => void;
  handleShowModal: () => void;
  hasMoreData?: {
    images: ImageDocument[];
    activeImageIndex: number;
    onChangeIndex: (index: number) => void;
  };
}) {
  return (
    <section className={styles.container}>
      {images.slice(0, 6).map((image, i) => (
        <Thumbnail
          key={i}
          image={image}
          isActive={i === activeIndex}
          hasMore={i === 5 && images.length > 6}
          hasMoreLabel={
            i === 5 && images.length > 6
              ? "view all"
              : undefined
          }
          onClick={
            i === 5 && images.length > 6
              ? handleShowModal
              : undefined
          }
          onHover={
            i === 5 && images.length > 6
              ? undefined
              : () => {
                  onChangeActiveIndex(i);
                }
          }
          hasMoreData={hasMoreData}
        />
      ))}
    </section>
  );
}
