import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { VenueDocument } from "@/schemas/services/venue";
import { usePathname } from "next/navigation";
import { AddonActions } from "../addon/AddonAction";

export default function VenueList({
  offset,
  venues,
  onToggleActive,
  onDelete
}: {
  offset: number;
  venues: VenueDocument[];
  onToggleActive: (
    id: string,
    isActive: boolean
  ) => void;
  onDelete: (id: string) => void;
}) {
  const currPath = usePathname();
  const tableData: tableDataType = {
    header: [
      { label: "Venue", span: 5 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  tableData.data = venues.map(
    ({ _id, venue, isActive, isDeleted }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: venue,
            type: "text"
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
