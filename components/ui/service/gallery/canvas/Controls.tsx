import Image from "next/image";

import styles from "@/components/ui/service/gallery/canvas/controls.module.css";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import Suggestions from "../../suggestions/Suggestions";
import { ServiceDocument } from "@/schemas/cms/service";
import SparkleSVG from "@/public/icons/sparkles.svg";

export default function Controls({
  count,
  activeIndex,
  suggestions,
  isMobile,
  onClickImage,
  onClickSuggestion
}: {
  count: number;
  activeIndex: number;
  suggestions: ServiceDocument[];
  isMobile: boolean;
  onClickImage: (index: number) => void;
  onClickSuggestion: () => void;
}) {
  const checkActive = (index: number): boolean =>
    (index === 0 && activeIndex === 0) ||
    (count === 2 &&
      index === 1 &&
      activeIndex === 1) ||
    (count > 2 &&
      index === 1 &&
      activeIndex !== 0 &&
      activeIndex !== count - 1) ||
    (index === 2 && activeIndex === count - 1);

  const getOnClick = (
    index: number
  ): (() => void) | undefined => {
    if (count === 1) {
      return undefined;
    }

    if (count === 2) {
      if (index === 0) {
        if (activeIndex === 0) {
          return undefined;
        } else {
          return () => onClickImage(0);
        }
      }

      if (index === 1) {
        if (activeIndex === 1) {
          return undefined;
        } else {
          return () => onClickImage(1);
        }
      }
    }

    if (count > 2) {
      if (index === 0) {
        if (activeIndex === 0) {
          return undefined;
        } else if (activeIndex === count - 1) {
          return () =>
            onClickImage(activeIndex - 2);
        } else {
          return () =>
            onClickImage(activeIndex - 1);
        }
      }

      if (index === 1) {
        if (activeIndex === 0) {
          return () =>
            onClickImage(activeIndex + 1);
        } else if (activeIndex === count - 1) {
          return () =>
            onClickImage(activeIndex - 1);
        } else {
          return undefined;
        }
      }

      if (index === 2) {
        if (activeIndex === 0) {
          return () =>
            onClickImage(activeIndex + 2);
        } else if (activeIndex === count - 1) {
          return undefined;
        } else {
          return () =>
            onClickImage(activeIndex + 1);
        }
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.placeholder}></div>
      <section className={styles.images}>
        {Array.from({
          length:
            count > 2 ? 3 : count === 1 ? 1 : 2
        }).map((_, i) => (
          <button
            key={i}
            className={`
                ${styles.image}
                ${
                  checkActive(i)
                    ? styles.active
                    : ""
                }
                ${styles.more}
              `}
            onClick={getOnClick(i)}
            aria-label="Service image navigator bubble"
          />
        ))}
      </section>
      <section
        className={`
        ${styles.suggestion}
        ${suggestions.length ? "" : styles.hide}
      `}
      >
        <Sheet>
          <SheetTrigger className="w-full outline-none">
            <div className={styles.aiBorder}>
              <div className={styles.btn}>
                <ThreeSparkles />
                <span className={styles.btnText}>
                  similar
                </span>
              </div>
            </div>
          </SheetTrigger>

          <SheetContent
            side={isMobile ? "bottom" : "right"}
            className={` py-0 px-4 sm:px-6 ${isMobile ? "h-[332px] w-screen pr-0" : "min-w-fit"} outline-none`}
          >
            <Suggestions
              suggestions={suggestions}
              isMobile={isMobile}
              onHideSuggestions={() => {}}
            />
          </SheetContent>
        </Sheet>
      </section>
    </section>
  );
}

const ThreeSparkles = () => {
  return (
    <div className="relative translate-x-[1px] h-[25px] grid place-items-center *:row-start-1 *:col-start-1">
      <Image
        src={SparkleSVG.src}
        width={26}
        height={26}
        alt="Sparkle"
        className="scale-125"
      />
      <Image
        src={SparkleSVG.src}
        width={7}
        height={7}
        alt="Sparkle"
        className="absolute -left-2 top-1"
      />
      <Image
        src={SparkleSVG.src}
        width={12}
        height={12}
        alt="Sparkle"
        className="absolute -left-3 bottom-0 scale-90"
      />
    </div>
  );
};
