// types
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";

// styles
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

export default function DeliveryTypeList({
  offset,
  timeTypes,
  onToggleActive,
  onDelete
}: {
  offset: number;
  timeTypes: DeliveryTypeDocument[];
  onToggleActive: (
    deliveryTypeId: string,
    isActive: boolean
  ) => void;
  onDelete: (deliveryTypeId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Name", span: 4 },
      { label: "Total", span: 2 },
      { label: "Price", span: 2 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = timeTypes.map(
    ({
      _id,
      name,
      price,
      timeSlots,
      isActive
    }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: name,
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(timeSlots.length),
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: "₹" + String(price),
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
