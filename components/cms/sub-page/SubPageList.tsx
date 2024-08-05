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
import { SubPageDocument } from "@/schemas/cms/subPage";
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function SubPageList({
  offset,
  subPages,
  onToggleActive,
  onDelete
}: {
  offset: number;
  subPages: SubPageDocument[];
  onToggleActive: (
    subPageId: string,
    isActive: boolean
  ) => void;
  onDelete: (subPageId: string) => void;
}) {
  const { addStatus } = useStatusContext();

  const currPath = usePathname();

  const subPagesData: tableDataType = {
    header: [
      { label: "Name", span: 5, align: "left" },
      { label: "Slug", span: 2, align: "left" },
      {
        label: "category",
        span: 2,
        align: "left"
      },
      { label: "page", span: 2, align: "left" },
      { label: "Active", span: 1 },
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
      // page -------------------------------------
      row.push({
        label: {
          label:
            (subPage?.page as PageDocument)
              .name || "",
          type: "text",
          align: "left"
        },
        action: {
          action: <></>,
          type: "none"
        }
      });
      // active -------------------------------------
      row.push({
        label: {
          label: subPage?.isActive ? (
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
            subPage?.isCompleted
              ? (() => {
                  onToggleActive(
                    subPage._id,
                    !subPage.isActive
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
                editHref: `${currPath}/edit/${subPage?._id}`,
                viewHref: `/${((subPage.page as PageDocument).category as ServiceCategoryDocument).slug}/${(subPage.page as PageDocument).slug}/${subPage?.slug}`
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

  const handleIncompleteToggleActive = () => {
    addStatus([
      {
        type: "warning",
        message:
          "Can't Activate Incomplete Sub Page"
      }
    ]);
  };

  return <AdminTable data={subPagesData} />;
}
