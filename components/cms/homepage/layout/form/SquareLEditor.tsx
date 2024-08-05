// components
import FormControl from "@/components/common/form/FormControl";
import SquareLForm, {
  getSquareLFormConfig
} from "@/components/cms/homepage/layout/form/SquareLForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/squareMEditor.module.css";

export default function SquareLEditor({
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
        config={getSquareLFormConfig(
          defaultValue
        )}
      >
        <SquareLForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
