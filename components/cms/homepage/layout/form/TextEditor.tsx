// components
import FormControl from "@/components/common/form/FormControl";
import TextForm, {
  getTextFormConfig
} from "@/components/cms/homepage/layout/form/TextForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/textEditor.module.css";

export default function TextEditor({
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
        config={getTextFormConfig(defaultValue)}
      >
        <TextForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
