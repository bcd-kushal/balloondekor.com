import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";
import {
  BinSVG,
  EyeOnSVG,
  LinkExternalSVG,
  PenSVG
} from "@/constants/svgs/svg";
import Link from "next/link";

type AddonActionsType = {
  href: { editHref: string; viewHref: string };
  alt: string;
  onDelete: any;
  onLinkClick: any;
};

export function AddonActions({
  href,
  alt,
  onDelete,
  onLinkClick
}: AddonActionsType) {
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

      {/* external link =================== */}
      {/* <Link
        href={href.viewHref}
        target="_blank"
      >
        <LinkExternalSVG dimensions={16} />
      </Link> */}
    </span>
  );
}
