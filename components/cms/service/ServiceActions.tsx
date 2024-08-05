// libraries
import Link from "next/link";

// components
import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";

// constants
import {
  BinSVG,
  LinkExternalSVG,
  PenSVG
} from "@/constants/svgs/svg";

export function ServiceActions({
  href,
  onDelete
}: {
  href: {
    editHref: string;
    viewHref: string;
  };
  onDelete: any;
}) {
  return (
    <span className="flex gap-8 items-center justify-center h-full w-full">
      <Link href={href.editHref}>
        <PenSVG dimensions={16} />
      </Link>
      <TableModalWrapperButton
        type="action"
        label={<BinSVG dimensions={16} />}
        modalTitle="Confirm delete"
        modalType="destructive"
        onClickTrigger={() => onDelete()}
      />
      <Link
        href={href.viewHref}
        target="_blank"
      >
        <LinkExternalSVG dimensions={16} />
      </Link>
    </span>
  );
}
