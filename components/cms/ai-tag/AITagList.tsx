// types
import { AITagDocument } from "@/schemas/cms/aiTag";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { usePathname } from "next/navigation";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { AddonActions } from "../addon/AddonAction";

export default function AITagList({
  offset,
  aiTags,
  onToggleActive,
  onDelete
}: {
  offset: number;
  aiTags: AITagDocument[];
  onToggleActive: (
    aiTagId: string,
    isActive: boolean
  ) => void;
  onDelete: (aiTagId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Tag Name", span: 3 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 1 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = aiTags.map(
    ({ _id, label, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: label,
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
