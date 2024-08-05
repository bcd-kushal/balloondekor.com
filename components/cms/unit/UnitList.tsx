// types
import { UnitDocument } from "@/schemas/cms/unit";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { AddonActions } from "../addon/AddonAction";
import { usePathname } from "next/navigation";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";

export default function UnitList({
  offset,
  units,
  onToggleActive,
  onDelete
}: {
  offset: number;
  units: UnitDocument[];
  onToggleActive: (
    unitId: string,
    isActive: boolean
  ) => void;
  onDelete: (unitId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Name", span: 2 },
      {
        label: "Abbreviation",
        span: 1,
        align: "left"
      },
      { label: "Active", span: 1 },
      { label: "Actions", span: 1 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = units.map(
    ({ _id, name, abbr, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: name,
            type: "text"
          },
          action: { action: <></>, type: "none" }
        },
        {
          label: {
            label: abbr,
            type: "text",
            align: "left"
          },
          action: { action: <></>, type: "none" }
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
                onLinkClick={() =>
                  alert("EXTERNAL CLICK")
                }
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
