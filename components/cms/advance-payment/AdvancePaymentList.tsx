// components
import AdvancePaymentItem from "@/components/cms/advance-payment/AdvancePaymentItem";

// types
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";

// styles
import styles from "@/components/cms/advance-payment/advancePaymentList.module.css";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { AddonActions } from "../addon/AddonAction";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { usePathname } from "next/navigation";

export default function AdvancePaymentList({
  offset,
  advancePayments,
  onToggleActive,
  onDelete
}: {
  offset: number;
  advancePayments: AdvancePaymentDocument[];
  onToggleActive: (
    advancePaymentId: string,
    isActive: boolean
  ) => void;
  onDelete: (advancePaymentId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      {
        label: "Label",
        span: 3,
        align: "center"
      },
      { label: "Value", span: 3 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = advancePayments.map(
    ({ _id, label, value, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: label,
            type: "text",
            align: "center"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(value),
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: isActive ? (
              <SwitchOnSVG
                stroke="#00aa00"
                dimensions={22}
                className="group-hover:stroke-white duration-300 transition-colors"
              />
            ) : (
              <SwitchOffSVG
                stroke="#aa0000"
                dimensions={22}
                className="group-hover:stroke-[#eeeeee98] transition-colors duration-300"
              />
            ),
            type: "svg"
          },
          action: {
            action: () =>
              onToggleActive(_id, !isActive),
            type: "function"
          }
        },
        {
          label: {
            label: (
              <AddonActions
                href={{
                  editHref: `${currPath}/edit/${_id}`,
                  viewHref: `#`
                }}
                alt={
                  isActive
                    ? "Active icon"
                    : "Inactive icon"
                }
                onDelete={() => {
                  onDelete(_id);
                }}
                onLinkClick={() => {}}
              />
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        }
      ];

      return arr;
    }
  );

  return <AdminTable data={tableData} />;
}
