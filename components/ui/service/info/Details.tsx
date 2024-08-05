// components
import Collapsable from "@/components/client/service/Collapsable";
import Detail from "@/components/ui/service/info/Detail";

// styles
import styles from "@/components/ui/service/info/details.module.css";

export default function Details({
  title,
  includes,
  excludes
}: {
  title: string;
  includes: string[];
  excludes: string[];
}) {
  return (
    <Collapsable
      radiusAmount="1rem 1rem 0rem 0rem"
      heading={title}
      headingIconSrc="/icons/package-icon.svg"
      headingIconAlt="Includes Icon"
      collapseIconSrc="/icons/down-icon.svg"
      notCollapseIconSrc="/icons/up-icon.svg"
      collapseIconAlt="Collapse Icon"
    >
      {Boolean(includes.length) && (
        <section className={styles.includes}>
          {includes.map((content, i) => (
            <Detail
              key={i}
              content={content}
            />
          ))}
        </section>
      )}
      {Boolean(excludes.length) && (
        <section className={styles.excludes}>
          {excludes.map((content, i) => (
            <Detail
              key={i}
              content={content}
              isExclude
            />
          ))}
        </section>
      )}
    </Collapsable>
  );
}
