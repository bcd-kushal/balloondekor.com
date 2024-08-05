"use client";

// libraries
import Link from "next/link";

// components
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { BinActions } from "../service/BinActions";

// types
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function PageBinList({
  offset,
  pages,
  onRestore,
  onDelete
}: {
  offset: number;
  pages: PageDocument[];
  onRestore: (pageId: string) => void;
  onDelete: (pageId: string) => void;
}) {
  const pageData: tableDataType = {
    header: [
      { label: "Name", span: 3, align: "left" },
      { label: "Slug", span: 2, align: "left" },
      {
        label: "category",
        span: 4,
        align: "left"
      },
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
      // actions -------------------------------------
      row.push({
        label: {
          label: (
            <BinActions
              onRestore={() => {
                onRestore(page?._id);
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
