"use client";

// components
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { BinActions } from "../service/BinActions";

// types
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { SubPageDocument } from "@/schemas/cms/subPage";

export default function SubPageBinList({
  offset,
  subPages,
  onRestore,
  onDelete
}: {
  offset: number;
  subPages: SubPageDocument[];
  onRestore: (subPageId: string) => void;
  onDelete: (subPageId: string) => void;
}) {
  const subPagesData: tableDataType = {
    header: [
      { label: "Name", span: 5, align: "left" },
      { label: "Slug", span: 2, align: "left" },
      {
        label: "category",
        span: 2,
        align: "left"
      },
      { label: "Actions", span: 2 }
    ],
    data: subPages.map((subPage) => {
      const row: TableDataRowType = [];

      // name -------------------------------------
      row.push({
        label: {
          label: subPage?.name,
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
              {subPage?.slug}
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
              (subPage?.page as PageDocument)
                .category as ServiceCategoryDocument
            ).name || "",
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
                onRestore(subPage?._id);
              }}
              onDelete={() => {
                onDelete(subPage?._id);
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

  return <AdminTable data={subPagesData} />;
}
