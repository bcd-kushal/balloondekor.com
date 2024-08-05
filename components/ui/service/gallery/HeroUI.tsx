// libraries
import {
  PointerEvent,
  TouchEventHandler,
  useRef
} from "react";
import Image from "next/image";

// styles
import styles from "@/components/ui/service/gallery/heroUI.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "../../sheet";
import { HeroImagesPreviewer } from "@/components/client/service/Hero";

export default function HeroUI({
  image: { alt, defaultAlt, url },
  images,
  activeIndex,
  isDesktop,
  imageFit,
  onClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: {
  image: ImageDocument;
  images: ImageDocument[];
  activeIndex: number;
  isDesktop: boolean;
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
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: () => void;
}) {
  return (
    <>
      {isDesktop ? (
        <section
          className={styles.container}
          onTouchStart={(e) =>
            onTouchStart(e as any)
          }
          onTouchMove={(e) =>
            onTouchMove(e as any)
          }
          onTouchEnd={onTouchEnd}
        >
          <Image
            className={styles.image}
            draggable={false}
            style={{
              cursor: onClick
                ? "pointer"
                : "initial",
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
          />
        </section>
      ) : (
        <Sheet>
          <SheetTrigger>
            <section
              className={styles.container}
              onTouchStart={(e) =>
                onTouchStart(e as any)
              }
              onTouchMove={(e) =>
                onTouchMove(e as any)
              }
              onTouchEnd={onTouchEnd}
            >
              <Image
                className={styles.image}
                draggable={false}
                style={{
                  cursor: onClick
                    ? "pointer"
                    : "initial",
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
              />
            </section>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="md:max-w-[45dvw] md:hidden rounded-3xl"
          >
            <HeroImagesPreviewer
              currIndex={activeIndex}
              images={images}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
