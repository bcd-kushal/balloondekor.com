// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { ImageDocument } from "@/schemas/cms/image";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import Image from "next/image";

// styles
import { AddonActions } from "./AddonAction";
import { usePathname } from "next/navigation";

const toSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export default function AddonList({
  offset,
  addons,
  onToggleActive,
  onDelete
}: {
  offset: number;
  addons: AddonDocument[];
  onToggleActive: (
    addonId: string,
    isActive: boolean
  ) => void;
  onDelete: (addonId: string) => void;
}) {
  const addonData: tableDataType = {
    header: [
      { label: "Image", span: 1 },
      {
        label: "Category",
        span: 2,
        align: "left"
      },
      { label: "Name", span: 6, align: "left" },
      { label: "Price", span: 2 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };

  const currPath = usePathname();

  const n = addons.length;
  for (let i = 0; i < n; i++) {
    const addon = addons[i];
    const row: TableDataRowType = [];

    // image -------------------------------------
    row.push({
      label: {
        label: (
          <Image
            src={
              (addon?.image as ImageDocument).url
            }
            alt={
              (addon?.image as ImageDocument)
                .alt ||
              (addon?.image as ImageDocument)
                .defaultAlt
            }
            width={50}
            height={50}
            className="rounded-lg aspect-square overflow-hidden object-cover"
          />
        ),
        type: "image"
      },
      action: {
        action: <></>,
        type: "none"
      }
    });
    // category -------------------------------------
    row.push({
      label: {
        label: (
          addon?.category as AddonCategoryDocument
        ).name,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });
    // name -------------------------------------
    row.push({
      label: {
        label: addon?.name,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });
    // price -------------------------------------
    row.push({
      label: {
        label: `₹ ${String(addon?.price)}`,
        type: "text"
      },
      action: { action: <></>, type: "none" }
    });

    // active -------------------------------------
    row.push({
      label: {
        label: addon?.isActive ? (
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
            addon._id,
            !addon.isActive
          );
        },
        type: "function"
      }
    });
    // actions -------------------------------------
    row.push({
      label: {
        label: (
          <AddonActions
            href={{
              editHref: `${currPath}/edit/${addon?._id}`,
              viewHref: `/addons/${toSlug(addon?.name)}`
            }}
            alt={
              (addon?.image as ImageDocument).alt
            }
            onDelete={() => {
              onDelete(addon?._id);
            }}
            onLinkClick={() =>
              alert("EXTERNAL CLICK")
            }
          />
        ),
        type: "svg"
      },
      action: { action: <></>, type: "component" }
    });

    addonData.data.push(row);
  }

  return <AdminTable data={addonData} />;
}
