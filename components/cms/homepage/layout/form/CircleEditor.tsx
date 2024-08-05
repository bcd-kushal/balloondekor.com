// components
import FormControl from "@/components/common/form/FormControl";
import CircleForm, {
  getCircleFormConfig
} from "@/components/cms/homepage/layout/form/CircleForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/circleEditor.module.css";

export default function CircleEditor({
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
        config={getCircleFormConfig(defaultValue)}
      >
        <CircleForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
