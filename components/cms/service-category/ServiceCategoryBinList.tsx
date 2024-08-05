"use client";

// components

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// types
import { ImageDocument } from "@/schemas/cms/image";

import Image from "next/image";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { usePathname } from "next/navigation";
import { useStatusContext } from "@/hooks/useStatusContext";
import NoIcon from "@/public/placeholders/NoIcon.webp";
import Link from "next/link";
import { BinActions } from "../service/BinActions";

const toSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export default function ServiceCategoryBinList({
  offset,
  serviceCategories,
  onRestore,
  onDelete
}: {
  offset: number;
  serviceCategories: ServiceCategoryDocument[];
  onRestore: (serviceCategoryId: string) => void;
  onDelete: (serviceCategoryId: string) => void;
}) {
  const servicesData: tableDataType = {
    header: [
      { label: "Image", span: 1 },
      { label: "Name", span: 4, align: "left" },
      { label: "Slug", span: 4, align: "left" },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  const { addStatus } = useStatusContext();

  const handleIncompleteToggleActive = () => {
    addStatus([
      {
        type: "warning",
        message:
          "Can't Activate Incomplete Service"
      }
    ]);
  };

  const currPath = usePathname();

  const n = serviceCategories.length;
  for (let i = 0; i < n; i++) {
    const serviceCategory = serviceCategories[i];
    if (!serviceCategory) continue;
    const row: TableDataRowType = [];

    row.push({
      label: {
        label: (
          <Image
            className="rounded-lg aspect-square overflow-hidden object-cover"
            src={
              "icon" in serviceCategory
                ? (
                    serviceCategory?.icon as ImageDocument
                  )?.url
                : NoIcon.src
            }
            alt={
              (
                serviceCategory?.icon as ImageDocument
              )?.alt ||
              (
                serviceCategory?.icon as ImageDocument
              )?.defaultAlt ||
              ""
            }
            width={50}
            height={50}
            quality={10}
          />
        ),
        type: "image"
      },
      action: {
        action: <></>,
        type: "none"
      }
    });
    row.push({
      label: {
        label: serviceCategory?.name,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });
    row.push({
      label: {
        label: (
          <span
            className={`py-[4px] px-[8px] text-[12px] border-[1px] rounded-full whitespace-nowrap truncate max-w-[180px]  border-[#12121215] text-[#121212] bg-[#12121205] group-hover:text-white group-hover:border-white`}
          >
            {serviceCategory?.slug}
          </span>
        ),
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "component" }
    });
    row.push({
      label: {
        label: (
          <BinActions
            onRestore={() => {
              onRestore(serviceCategory?._id);
            }}
            onDelete={() => {
              onDelete(serviceCategory?._id);
            }}
          />
        ),
        type: "svg"
      },
      action: { action: <></>, type: "component" }
    });

    servicesData.data.push(row);
  }

  return <AdminTable data={servicesData} />;
}
