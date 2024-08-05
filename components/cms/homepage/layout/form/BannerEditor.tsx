// components
import FormControl from "@/components/common/form/FormControl";
import BannerForm, {
  getBannerFormConfig
} from "@/components/cms/homepage/layout/form/BannerForm";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/layout/form/bannerEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function BannerEditor({
  title,
  defaultValue
}: {
  title: string;
  defaultValue: HomepageLayoutDocument;
}) {
  return (
    <CMSPageLayout
      title={title}
      noAddBtn
    >
      <FormControl
        config={getBannerFormConfig(defaultValue)}
      >
        <BannerForm id={defaultValue._id} />
      </FormControl>
    </CMSPageLayout>
  );
}
