import ProductEditor from "@/components/cms/product/ProductEditor";

export default function EditProductEditorPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <ProductEditor productId={id} />;
}
