import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";
import {
  BinSVG,
  PenSVG
} from "@/constants/svgs/svg";
import Link from "next/link";

type ProductActionsType = {
  href: { editHref: string; viewHref: string };
  alt: string;
  onDelete: any;
  onLinkClick: any;
};

export function ProductAction({
  href,
  alt,
  onDelete,
  onLinkClick
}: ProductActionsType) {
  return (
    <span className="flex gap-8 items-center justify-center h-full w-full">
      {/* edit btn  ======================== */}
      <Link href={href.editHref}>
        <PenSVG dimensions={16} />
      </Link>

      {/* delete ============================= */}
      <TableModalWrapperButton
        type="action"
        label={<BinSVG dimensions={16} />}
        modalTitle="Confirm delete"
        onClickTrigger={() => onDelete()}
        modalType="destructive"
      />
    </span>
  );
}
