import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";
import {
  BinSVG,
  PenSVG
} from "@/constants/svgs/svg";
import Link from "next/link";

type FooterActionsType = {
  href: { editHref: string };
  onDelete: any;
};

export function FooterAction({
  href,
  onDelete
}: FooterActionsType) {
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
