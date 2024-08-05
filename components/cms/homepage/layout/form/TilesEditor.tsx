// components
import FormControl from "@/components/common/form/FormControl";
import TilesForm, {
  getTilesFormConfig
} from "@/components/cms/homepage/layout/form/TilesForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/tilesEditor.module.css";

export default function TilesEditor({
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
        config={getTilesFormConfig(defaultValue)}
      >
        <TilesForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
