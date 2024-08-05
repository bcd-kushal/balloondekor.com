// Components
import Contents from "../serviceCategory/Contents";

// Styles
import styles from "@/components/ui/dynamicPage/dynamicPageUI.module.css";

// Types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";

export default function DynamicPageUI({
  dynamicPage: { content }
}: {
  dynamicPage: DynamicPageDocument;
}) {
  return (
    <main className={styles.container}>
      {content && <Contents content={content} />}
    </main>
  );
}
