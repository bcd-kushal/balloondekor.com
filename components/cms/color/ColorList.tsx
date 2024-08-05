// types
import { ColorDocument } from "@/schemas/cms/color";

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

export default function List({
  offset,
  colors,
  onToggleActive,
  onDelete
}: {
  offset: number;
  colors: ColorDocument[];
  onToggleActive: (
    colorId: string,
    isActive: boolean
  ) => void;
  onDelete: (colorId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Color", span: 1 },
      { label: "Name", span: 5, align: "left" },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = colors.map(
    ({ _id, name, code, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: (
              <div
                className="aspect-square rounded-lg w-[30px]"
                style={{ background: code }}
              ></div>
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        {
          label: {
            label: name,
            type: "text",
            align: "left"
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
