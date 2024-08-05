"use client";

// libraries
import { usePathname } from "next/navigation";

// constants
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";

// components
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { ServiceActions } from "../service/ServiceActions";

// types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";

export default function DynamicPageList({
  offset,
  dynamicPages: pages,
  onToggleActive,
  onDelete
}: {
  offset: number;
  dynamicPages: DynamicPageDocument[];
  onToggleActive: (
    dynamicPageId: string,
    isActive: boolean
  ) => void;
  onDelete: (dynamicPageId: string) => void;
}) {
  const currPath = usePathname();

  const pageData: tableDataType = {
    header: [
      { label: "Name", span: 4, align: "left" },
      { label: "Slug", span: 2, align: "left" },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],
    data: pages.map((page) => {
      const row: TableDataRowType = [];
      row.push({
        label: {
          label: page?.name,
          type: "text",
          align: "left"
        },
        action: {
          action: <></>,
          type: "none"
        }
      });
      row.push({
        label: {
          label: (
            <span
              className={`py-[4px] px-[8px] text-[12px] border-[1px] rounded-full whitespace-nowrap truncate max-w-[120px]  border-[#12121215] text-[#121212] bg-[#12121205] group-hover:text-white group-hover:border-white`}
            >
              {page?.slug}
            </span>
          ),
          type: "text",
          align: "left"
        },
        action: {
          action: <></>,
          type: "component"
        }
      });
      // active -------------------------------------
      row.push({
        label: {
          label: page?.isActive ? (
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
          action: () => {
            onToggleActive(
              page._id,
              !page.isActive
            );
          },
          type: "function"
        }
      });
      // actions -------------------------------------
      row.push({
        label: {
          label: (
            <ServiceActions
              href={{
                editHref: `${currPath}/edit/${page?._id}`,
                viewHref: `/pages/${page?.slug}`
              }}
              onDelete={() => {
                onDelete(page?._id);
              }}
            />
          ),
          type: "svg"
        },
        action: {
          action: <></>,
          type: "component"
        }
      });

      return row;
    }),
    offset: offset
  };

  return <AdminTable data={pageData} />;
}
