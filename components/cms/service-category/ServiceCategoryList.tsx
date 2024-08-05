"use client";

// components

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import { ServiceActions } from "../service/ServiceActions";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import Image from "next/image";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { usePathname } from "next/navigation";
import { useStatusContext } from "@/hooks/useStatusContext";
import NoIcon from "@/public/placeholders/NoIcon.webp";
import Link from "next/link";

const toSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export default function ServiceCategoryList({
  offset,
  serviceCategories,
  onToggleActive,
  onDelete
}: {
  offset: number;
  serviceCategories: ServiceCategoryDocument[];
  onToggleActive: (
    serviceCategoryId: string,
    isActive: boolean
  ) => void;
  onDelete: (serviceCategoryId: string) => void;
}) {
  const servicesData: tableDataType = {
    header: [
      { label: "Image", span: 1 },
      { label: "Name", span: 4, align: "left" },
      { label: "Slug", span: 4, align: "left" },
      { label: "Services", span: 2 },
      { label: "Pages", span: 2 },
      { label: "Active", span: 2 },
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
    const service = serviceCategories[i];
    if (!service) continue;
    const row: TableDataRowType = [];

    row.push({
      label: {
        label: (
          <Image
            className="rounded-lg aspect-square overflow-hidden object-cover"
            src={
              "icon" in service
                ? (service?.icon as ImageDocument)
                    ?.url
                : NoIcon.src
            }
            alt={
              (service?.icon as ImageDocument)
                ?.alt ||
              (service?.icon as ImageDocument)
                ?.defaultAlt ||
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
        label: service?.name,
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
            {service?.slug}
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
          <Link
            href={`/cms/content/services?category=${encodeURIComponent(service?._id)}`}
            prefetch={true}
            className="p-3 bg-[#12121218] rounded-lg text-[12px] transition-colors duration-300 group-hover:text-white hover:bg-blue-900"
          >
            View Services
          </Link>
        ),
        type: "text"
      },
      action: { action: <></>, type: "component" }
    });
    row.push({
      label: {
        label: (
          <Link
            href={`/cms/page?category=${encodeURIComponent(service?._id)}`}
            prefetch={true}
            className="p-3 bg-[#12121218] rounded-lg text-[12px] transition-colors duration-300 group-hover:text-white hover:bg-blue-900"
          >
            View Pages
          </Link>
        ),
        type: "text"
      },
      action: { action: <></>, type: "component" }
    });
    row.push({
      label: {
        label: service?.isActive ? (
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
          service?.isCompleted
            ? (() => {
                onToggleActive(
                  service._id,
                  !service.isActive
                );
              })()
            : handleIncompleteToggleActive();
        },
        type: "function"
      }
    });
    row.push({
      label: {
        label: (
          <ServiceActions
            href={{
              editHref: `${currPath}/edit/${service?._id}`,
              viewHref: `/${toSlug(service?.name)}`
            }}
            onDelete={() => {
              onDelete(service?._id);
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
