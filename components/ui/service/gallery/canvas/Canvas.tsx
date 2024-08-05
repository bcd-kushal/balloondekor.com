// components
import Controls from "@/components/ui/service/gallery/canvas/Controls";
import Hero from "@/components/client/service/Hero";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "@/components/ui/service/gallery/canvas/canvas.module.css";
import { ServiceDocument } from "@/schemas/cms/service";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

export default function Canvas({
  images,
  activeIndex,
  suggestions,
  isMobile,
  onChangeActiveIndex,
  onShowModal,
  onShowSuggestion
}: {
  images: ImageDocument[];
  activeIndex: number;
  suggestions: ServiceDocument[];
  isMobile: boolean;
  onChangeActiveIndex: (index: number) => void;
  onShowModal: () => void;
  onShowSuggestion: () => void;
}) {
  return (
    <section className={styles.container}>
      <Controls
        count={images.length}
        activeIndex={activeIndex}
        isMobile={isMobile}
        suggestions={suggestions}
        onClickImage={onChangeActiveIndex}
        onClickSuggestion={onShowSuggestion}
      />
      {/* <Hero
        images={images}
        activeIndex={activeIndex}
        isDesktop={!isMobile}
        imageFit="fill"
        onClick={onShowModal}
        onSwipe={onChangeActiveIndex}
      /> */}
      {isMobile ? (
        <Sheet>
          <SheetTrigger
            className="p-0 outline-none bg-transparent"
            asChild
          >
            <ServiceImagePreviewer
              images={images}
              activeIndex={activeIndex}
            />
          </SheetTrigger>

          <SheetContent>Images here</SheetContent>
        </Sheet>
      ) : (
        <ServiceImagePreviewer
          images={images}
          activeIndex={activeIndex}
        />
      )}
    </section>
  );
}

const ServiceImagePreviewer = ({
  images,
  activeIndex
}: {
  images: ImageDocument[];
  activeIndex: number;
}) => {
  return (
    <section className="aspect-square grid grid-cols-1 sm:rounded-3xl overflow-hidden relative">
      <Carousel
        className="grid grid-cols-1"
        opts={{
          loop: true,
          startIndex: activeIndex || 0
        }}
      >
        <CarouselContent className="w-full h-full">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="bg-gradient-to-br from-neutral-100/10 to-neutral-300 relative overflow-hidden grid place-items-center *:w-full *:h-full"
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={800}
                height={800}
                unoptimized
                priority
                decoding="async"
                className="object-center object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
