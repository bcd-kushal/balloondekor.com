// components
import Backdrop from "@/components/common/Backdrop";
import Suggestion from "./Suggestion";

// icons
import { CrossSVG } from "@/constants/svgs/svg";
import SparkleSVG from "@/public/icons/sparkles.svg";

// styles
import styles from "@/components/ui/service/suggestions/suggestions.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";
import { SheetClose } from "../../sheet";
import Image from "next/image";

export default function Suggestions({
  suggestions,
  isMobile,
  onHideSuggestions
}: {
  suggestions: ServiceDocument[];
  isMobile: boolean;
  onHideSuggestions: () => void;
}) {
  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <div className={styles.heading}>
          <span className="scale-90">
            <ThreeSparkles />
          </span>
          AI suggested
        </div>
        <SheetClose>
          <CrossSVG
            className={styles.closeIcon}
          />
        </SheetClose>
      </section>
      <section
        className={`${isMobile ? "flex items-start justify-start gap-1 w-full overflow-x-scroll scrollbar-hide" : styles.suggestions}`}
      >
        {suggestions.map(
          ({
            _id,
            name,
            media: { primary },
            price
          }) => (
            <Suggestion
              key={_id}
              slug={name
                .toLowerCase()
                .split(" ")
                .join("-")}
              image={primary as ImageDocument}
              name={name}
              priceDetails={price}
              isMobile={isMobile}
            />
          )
        )}
      </section>
    </section>
  );
}

const ThreeSparkles = () => {
  return (
    <div className="relative translate-x-[1px]  grid place-items-center *:row-start-1 *:col-start-1">
      <Image
        src={SparkleSVG.src}
        width={26}
        height={26}
        alt="Sparkle"
      />
      <Image
        src={SparkleSVG.src}
        width={9}
        height={9}
        alt="Sparkle"
        className="absolute -left-[3px] top-0"
      />
      <Image
        src={SparkleSVG.src}
        width={14}
        height={14}
        alt="Sparkle"
        className="absolute -left-3 -bottom-[4px] scale-90"
      />
    </div>
  );
};
