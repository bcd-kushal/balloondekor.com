// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

//styles
import styles from "@/components/cms/homepage/layout/ui/text.module.css";

export default function Text({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: layout.contents[0].content
        }}
      ></div>
    </div>
  );
}
