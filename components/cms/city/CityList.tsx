// types
import { CityDocument } from "@/schemas/cms/city";
import { ImageDocument } from "@/schemas/cms/image";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { AddonActions } from "../addon/AddonAction";
import {
  SwitchOffSVG,
  SwitchOnSVG,
  TrendingSVG
} from "@/constants/svgs/svg";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function List({
  offset,
  city,
  onToggleActive,
  onDelete
}: {
  offset: number;
  city: CityDocument[];
  onToggleActive: (
    cityId: string,
    isActive: boolean
  ) => void;
  onDelete: (cityId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      { label: "Icon", span: 1 },
      { label: "City", span: 7, align: "left" },
      { label: " ", span: 1 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const currPath = usePathname();

  tableData.data = city.map(
    ({
      _id,
      name,
      isTopCity,
      icon,
      isActive
    }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: icon ? (
              <span className="overflow-hidden bg-black/20 w-[40px] aspect-square rounded-full object-cover flex items-center justify-center">
                <Image
                  src={
                    (icon as ImageDocument).url ||
                    "#"
                  }
                  alt={
                    (icon as ImageDocument).alt ||
                    "#"
                  }
                  height={40}
                  width={40}
                />
              </span>
            ) : (
              <span className="h-[40px] w-[40px] rounded-full bg-black/20 flex items-center justify-center"></span>
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
            label: isTopCity ? (
              <TrendingSVG dimensions={20} />
            ) : (
              <></>
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
