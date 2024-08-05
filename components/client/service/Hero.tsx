// libraries
import {
  PointerEvent,
  useRef,
  useState
} from "react";
import Image from "next/image";

// components
import HeroUI from "@/components/ui/service/gallery/HeroUI";

// types
import { ImageDocument } from "@/schemas/cms/image";

export default function Hero({
  images,
  activeIndex,
  imageFit,
  isDesktop,
  onClick,
  onSwipe
}: {
  images: ImageDocument[];
  activeIndex: number;
  imageFit?: "maintainRatio" | "fill";
  isDesktop: boolean;
  onClick?: () => void;
  onSwipe?: (index: number) => void;
}) {
  const [isSwiping, setIsSwiping] =
    useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handlePointerDown = (
    event: PointerEvent<HTMLImageElement>
  ) => {
    setIsSwiping(true);
    setStartX(event.nativeEvent.clientX);
    setStartY(event.nativeEvent.clientY);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLImageElement>
  ) => {
    if (!isSwiping) return;

    const deltaX =
      event.nativeEvent.clientX - startX;
    const deltaY =
      event.nativeEvent.clientY - startY;

    if (
      Math.abs(deltaX) > 50 ||
      Math.abs(deltaY) > 50
    ) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          if (activeIndex !== 0) {
            onSwipe!(activeIndex - 1);
          } else {
            onSwipe!(images.length - 1);
          }
        } else {
          if (activeIndex !== images.length - 1) {
            onSwipe!(activeIndex + 1);
          } else {
            onSwipe!(0);
          }
        }
      }

      setIsSwiping(false);
    }
  };

  const handlePointerUp = () => {
    setIsSwiping(false);
  };

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (
    event: TouchEvent
  ) => {
    touchStartX.current =
      event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current &&
      touchEndX.current
    ) {
      const difference =
        touchStartX.current - touchEndX.current;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          onSwipe!(
            Math.abs(activeIndex + 1) %
              images.length
          );
        } else {
          onSwipe!(
            Math.abs(activeIndex - 1) %
              images.length
          );
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <HeroUI
      image={
        images[
          activeIndex < images.length
            ? activeIndex
            : 0
        ]
      }
      images={images}
      imageFit={imageFit}
      activeIndex={activeIndex}
      isDesktop={isDesktop}
      onClick={onClick}
      onPointerDown={
        onSwipe ? handlePointerDown : undefined
      }
      onPointerMove={
        onSwipe ? handlePointerMove : undefined
      }
      onPointerUp={
        onSwipe ? handlePointerUp : undefined
      }
      onTouchStart={(e) =>
        handleTouchStart(e as any)
      }
      onTouchMove={(e) =>
        handleTouchMove(e as any)
      }
      onTouchEnd={handleTouchEnd}
    />
  );
}

export function HeroImagesPreviewer({
  images,
  currIndex
}: {
  images: ImageDocument[];
  currIndex: number;
}) {
  const [presentIndex, setPresentIndex] =
    useState<number>(currIndex);
  return (
    <section className="flex w-full flex-col justify-end gap-[12px] items-stretch">
      <main className="w-full *:w-full aspect-square *:aspect-square mt-2 md:mt-0">
        <Image
          src={images[presentIndex].url}
          alt={images[presentIndex].alt}
          width={200}
          height={200}
          className="rounded-3xl"
        />
      </main>
      <div className="flex w-full items-center gap-[12px] justify-start overflow-x-scroll scrollbar-hide">
        {images.map((image, index) => (
          <Image
            src={image.url}
            alt={image.alt}
            width={80}
            height={80}
            key={index}
            onClick={() =>
              setPresentIndex((prev) => index)
            }
            className={`rounded-3xl transition-all duration-200 ${presentIndex === index ? "border-2 border-[#4f3267]" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
