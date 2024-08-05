// libraries
import { PointerEvent } from "react";
import Image from "next/image";

// styles
import styles from "@/components/ui/service/gallery/heroUICarousel.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "../../carousel";

export default function HeroUICarousel({
  image: { alt, defaultAlt, url },
  images,
  imageFit,
  onClick,
  onPointerDown,
  onPointerMove,
  onPointerUp
}: {
  image: ImageDocument;
  images: ImageDocument[];
  imageFit?: "maintainRatio" | "fill";
  onClick?: () => void;
  onPointerDown?: (
    event: PointerEvent<HTMLImageElement>
  ) => void;
  onPointerMove?: (
    event: PointerEvent<HTMLImageElement>
  ) => void;
  onPointerUp?: (
    event: PointerEvent<HTMLImageElement>
  ) => void;
}) {
  const totalImages = images.length;
  return (
    <section
      className={styles.container}
      onClick={onClick}
    >
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <span>23</span>
          </CarouselItem>
          <CarouselItem>
            <span>23</span>
          </CarouselItem>
          <CarouselItem>
            <span>23</span>
          </CarouselItem>
          <CarouselItem>
            <span>23</span>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      {/* <Image
        className={styles.image}
        draggable={false}
        style={{
          cursor: onClick ? "pointer" : "initial",
          objectFit: imageFit
            ? imageFit === "maintainRatio"
              ? "contain"
              : "cover"
            : "initial"
        }}
        src={url}
        alt={alt || defaultAlt}
        layout="fill"
        priority
        unoptimized
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      /> */}
      ad
    </section>
  );
}
