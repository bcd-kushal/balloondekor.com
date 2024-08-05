// types
import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import {
  ArrowDownIcon,
  ArrowUpIcon
} from "@radix-ui/react-icons";
import { FooterAction } from "./FooterAction";

export default function FooterLinkList({
  offset,
  footerLinkSections,
  onToggleActive,
  onReorder,
  onDelete
}: {
  offset: number;
  footerLinkSections: FooterLinkSectionDocument[];
  onToggleActive: (
    occasionId: string,
    isActive: boolean
  ) => void;
  onReorder: (id1: string, id2: string) => void;
  onDelete: (occasionId: string) => void;
}) {
  const footerData: tableDataType = {
    header: [
      { label: "Name", span: 4 },
      { label: "Active", span: 1 },
      { label: "Move up", span: 1 },
      { label: "Move down", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  footerLinkSections.forEach(
    ({ _id, heading, isActive }, index) => {
      const rowData: TableDataRowType = [];

      // heading --------------
      rowData.push({
        label: { label: heading, type: "text" },
        action: { action: <></>, type: "none" }
      });
      // is active ------------
      rowData.push({
        label: {
          label: isActive ? (
            <SwitchOnSVG
              dimensions={20}
              stroke="#00aa00"
              className="group-hover:stroke-white"
            />
          ) : (
            <SwitchOffSVG
              dimensions={20}
              stroke="#aa0000"
              className="group-hover:stroke-[#fff8]"
            />
          ),
          type: "svg"
        },
        action: {
          action: () =>
            onToggleActive(_id, !isActive),
          type: "function"
        }
      }); // is active --------------
      // move up ---------
      rowData.push({
        label: {
          label: <ArrowUpIcon />,
          type: "svg"
        },
        action: {
          action:
            index > 0
              ? () => {
                  onReorder(
                    footerLinkSections[index - 1]
                      ._id,
                    _id
                  );
                }
              : () => {},
          type: "function"
        }
      }); // move up --------------
      // move down ---------
      rowData.push({
        label: {
          label: <ArrowDownIcon />,
          type: "svg"
        },
        action: {
          action:
            index < footerLinkSections.length - 1
              ? () => {
                  onReorder(
                    footerLinkSections[index + 1]
                      ._id,
                    _id
                  );
                }
              : () => {},
          type: "function"
        }
      }); // move down --------------
      // edit ---------
      rowData.push({
        label: {
          label: (
            <FooterAction
              href={{
                editHref: `/cms/footer/edit/${_id}`
              }}
              onDelete={() => {
                onDelete(_id);
              }}
            />
          ),
          type: "text"
        },
        action: {
          action: <></>,
          type: "component"
        }
      }); // edit --------------

      footerData.data.push(rowData);
    }
  );

  return <AdminTable data={footerData} />;
}
