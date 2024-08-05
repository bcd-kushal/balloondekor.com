// components
import FormControl from "@/components/common/form/FormControl";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";
import { ConfigType } from "@/hooks/useFormContext";

export default function HomepageLayoutEditorWrapper({
  title,
  getFormConfig,
  children
}: {
  title: string;
  getFormConfig: () => ConfigType;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <CMSPageLayout
      title={title}
      noAddBtn
    >
      <FormControl config={getFormConfig()}>
        {children}
      </FormControl>
    </CMSPageLayout>
  );
}
