import ReviewEditor from "@/components/cms/review/ReviewEditor";

export default function EditReviewPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <ReviewEditor reviewId={id} />;
}
