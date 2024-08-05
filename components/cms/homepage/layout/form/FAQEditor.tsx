// components
import FormControl from "@/components/common/form/FormControl";
import FAQForm, {
  getFAQFormConfig
} from "@/components/cms/homepage/layout/form/FAQForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/faqEditor.module.css";

export default function FAQEditor({
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
        config={getFAQFormConfig(defaultValue)}
      >
        <FAQForm id={defaultValue._id} />
      </FormControl>
    </div>
  );
}
