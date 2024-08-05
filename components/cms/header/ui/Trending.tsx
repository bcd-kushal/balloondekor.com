// Libraries
import Image from "next/image";

// Components
import TrendingLink from "./TrendingLink";

// Styles
import styles from "@/components/cms/header/ui/trending.module.css";

// Types
import { TrendingDocument } from "@/schemas/cms/trending";

export default function Trending({
  trendings
}: {
  trendings: TrendingDocument[];
}) {
  return (
    <section>
      <p className={styles.heading}>
        <Image
          src="/icons/fire.webp"
          alt="fire icon"
          height={15}
          width={15}
          unoptimized
        />
        <span>Trending Searches</span>
      </p>
      {trendings && Boolean(trendings.length) && (
        <div className={styles.trendingLinks}>
          {trendings.map(
            ({ _id, label, path }, i) => (
              <TrendingLink
                key={_id || i}
                label={label}
                path={path}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}
