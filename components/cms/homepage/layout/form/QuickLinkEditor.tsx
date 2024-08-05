// components
import FormControl from "@/components/common/form/FormControl";
import QuickLinkForm, {
  getQuickLinkFormConfig
} from "./QuickLinkForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/quickLinkEditor.module.css";

export default function QuickLinkEditor({
  title,
  defaultValue
}: {
  title: string;
  defaultValue: HomepageLayoutDocument;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <FormControl
        config={getQuickLinkFormConfig(
          defaultValue
        )}
      >
        <QuickLinkForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
