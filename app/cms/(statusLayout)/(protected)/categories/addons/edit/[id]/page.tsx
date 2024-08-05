import AddonCategoryEditor from "@/components/cms/addon-category/AddonCategoryEditor";

export default function EditAddonCategoryPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <AddonCategoryEditor addonCategoryId={id} />
  );
}
