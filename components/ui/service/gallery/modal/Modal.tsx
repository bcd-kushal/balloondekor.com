// libraries
import Image from "next/image";

// components
import Backdrop from "@/components/common/Backdrop";
import Hero from "@/components/client/service/Hero";
import Previews from "@/components/ui/service/gallery/modal/Previews";

// styles
import styles from "@/components/ui/service/gallery/modal/modal.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";

export default function Modal({
  images,
  currentIndex,
  onClose,
  onChangeIndex
}: {
  images: ImageDocument[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) {
  return (
    <Backdrop onClick={onClose}>
      <section className={styles.container}>
        <Image
          className={styles.closeIcon}
          src={"/icons/close-icon.svg"}
          alt="Close Icon"
          width={20}
          height={20}
          onClick={onClose}
        />
        <section className={styles.heroContainer}>
          <Hero
            images={images}
            activeIndex={currentIndex}
            imageFit="maintainRatio"
            isDesktop={true}
          />
        </section>
        <Previews
          images={images}
          currentIndex={currentIndex}
          onChangeIndex={onChangeIndex}
        />
      </section>
    </Backdrop>
  );
}
