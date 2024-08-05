// libraries
import { useEffect, useState } from "react";

// components
import GalleryUI from "@/components/ui/service/gallery/GalleryUI";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";

export default function Gallery({
  images,
  suggestions,
  onShowSuggestion
}: {
  images: ImageDocument[];
  suggestions: ServiceDocument[];
  onShowSuggestion: () => void;
}) {
  const [showModal, setShowModal] =
    useState<boolean>(false);

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  const [
    isMobileDimension,
    setIsMobileDimension
  ] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      if (innerWidth < 480 && !isMobileDimension)
        setIsMobileDimension((prev) => true);
      if (innerWidth >= 480 && isMobileDimension)
        setIsMobileDimension((prev) => false);
    };
    addEventListener("resize", checkScreen);
    checkScreen();
    return () => {};
  }, [isMobileDimension]);

  return (
    <GalleryUI
      showModal={showModal}
      isMobile={isMobileDimension}
      images={images}
      suggestions={suggestions}
      activeImageIndex={activeIndex}
      onChangeShowModal={setShowModal}
      onChangeActiveImageIndex={setActiveIndex}
      onShowSuggestion={onShowSuggestion}
    />
  );
}
