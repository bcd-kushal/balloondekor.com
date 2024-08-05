import BrandEditor from "@/components/cms/brand/BrandEditor";

export default function EditBrandPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <BrandEditor brandId={id} />;
}
