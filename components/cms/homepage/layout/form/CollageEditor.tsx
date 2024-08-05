// components
import FormControl from "@/components/common/form/FormControl";
import CollageForm, {
  getCollageFormConfig
} from "@/components/cms/homepage/layout/form/CollageForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/collageEditor.module.css";

export default function CollageEditor({
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
        config={getCollageFormConfig(
          defaultValue
        )}
      >
        <CollageForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
