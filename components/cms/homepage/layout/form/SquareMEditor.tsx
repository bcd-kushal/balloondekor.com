// components
import FormControl from "@/components/common/form/FormControl";
import SquareMForm, {
  getSquareMFormConfig
} from "@/components/cms/homepage/layout/form/SquareMForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/squareMEditor.module.css";

export default function SquareMEditor({
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
        config={getSquareMFormConfig(
          defaultValue
        )}
      >
        <SquareMForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
