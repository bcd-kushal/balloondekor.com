// types
import { ReviewDocument } from "@/schemas/cms/review";

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

export default function ReviewList({
  offset,
  reviews,
  onToggleActive,
  onDelete
}: {
  offset: number;
  reviews: ReviewDocument[];
  onToggleActive: (
    reviewId: string,
    isActive: boolean
  ) => void;
  onDelete: (reviewId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Review category", span: 3 },
      { label: "Count", span: 1 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 1 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = reviews.map(
    ({
      _id,
      reviewCategory,
      reviews,
      isActive
    }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: reviewCategory,
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(reviews.length),
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
