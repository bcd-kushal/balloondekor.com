"use client";

// libraries
import { usePathname } from "next/navigation";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

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
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import Link from "next/link";

export default function PageList({
  offset,
  pages,
  onToggleActive,
  onDelete
}: {
  offset: number;
  pages: PageDocument[];
  onToggleActive: (
    pageId: string,
    isActive: boolean
  ) => void;
  onDelete: (pageId: string) => void;
}) {
  const { addStatus } = useStatusContext();

  const currPath = usePathname();

  const pageData: tableDataType = {
    header: [
      { label: "Name", span: 3, align: "left" },
      { label: "Slug", span: 2, align: "left" },
      {
        label: "category",
        span: 4,
        align: "left"
      },
      { label: "Sub-Pages", span: 2 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 3 }
    ],
    data: pages.map((page) => {
      const row: TableDataRowType = [];

      // name -------------------------------------
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
      // slug -------------------------------------
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
      // category -------------------------------------
      row.push({
        label: {
          label:
            (
              page?.category as ServiceCategoryDocument
            )?.name || "",
          type: "text",
          align: "left"
        },
        action: {
          action: <></>,
          type: "none"
        }
      });
      // sub pages -------------------------------------
      row.push({
        label: {
          label: (
            <Link
              href={`/cms/sub-page?page=${encodeURIComponent(page?._id)}`}
              prefetch={true}
              className="p-3 bg-[#12121218] rounded-lg text-[12px] transition-colors duration-300 group-hover:text-white hover:bg-blue-900"
            >
              View Sub Pages
            </Link>
          ),
          type: "text"
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
            page?.isCompleted
              ? (() => {
                  onToggleActive(
                    page._id,
                    !page.isActive
                  );
                })()
              : handleIncompleteToggleActive();
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
                viewHref: `/${(page.category as ServiceCategoryDocument).slug}/${page?.slug}`
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

  const handleIncompleteToggleActive = () => {
    addStatus([
      {
        type: "warning",
        message: "Can't Activate Incomplete Page"
      }
    ]);
  };

  return <AdminTable data={pageData} />;
}
