// types
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";

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

export default function CustomizationQuestionList({
  offset,
  customizationQuestions,
  onToggleActive,
  onDelete
}: {
  offset: number;
  customizationQuestions: CustomizationQuestionDocument[];
  onToggleActive: (
    customizationQuestionId: string,
    isActive: boolean
  ) => void;
  onDelete: (
    customizationQuestionId: string
  ) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Question", span: 10 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = customizationQuestions.map(
    ({ _id, question, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: question,
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
