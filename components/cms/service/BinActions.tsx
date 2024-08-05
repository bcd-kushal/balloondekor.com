// components
import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";

// constants
import {
  RestoreSVG,
  BinSVG
} from "@/constants/svgs/svg";

export function BinActions({
  onRestore,
  onDelete
}: {
  onRestore: () => void;
  onDelete: () => void;
}) {
  return (
    <span className="flex gap-8 items-center justify-center h-full w-full">
      <TableModalWrapperButton
        type="action"
        label={<RestoreSVG dimensions={16} />}
        modalTitle="Confirm Restore"
        modalType="normal"
        onClickTrigger={() => onRestore()}
      />
      <TableModalWrapperButton
        type="action"
        label={<BinSVG dimensions={16} />}
        modalTitle="Confirm Permanent Delete"
        modalType="destructive"
        onClickTrigger={() => onDelete()}
      />
    </span>
  );
}
