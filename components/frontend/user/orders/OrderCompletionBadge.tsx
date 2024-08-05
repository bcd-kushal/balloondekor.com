export default function OrderCompletionBadge({
  status
}: {
  status:
    | "in-progress"
    | "cancelled"
    | "ordered"
    | "delivered";
}) {
  return (
    <span
      className={`capitalize translate-y-[2px] px-[8px] py-[2px] text-white ${status === "delivered" ? "bg-green-600" : status === "cancelled" ? "bg-red-500" : status === "ordered" ? "bg-pink-600" : "bg-amber-600"} rounded-lg text-center text-[13px] sm:font-medium`}
    >
      {status}
    </span>
  );
}
