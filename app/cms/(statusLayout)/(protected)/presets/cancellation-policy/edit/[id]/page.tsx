import CancellationPolicyEditor from "@/components/cms/cancellation-policy/CancellationPolicyEditor";
export default function EditCancellationPolicyPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <CancellationPolicyEditor
      cancellationPolicyId={id}
    />
  );
}
