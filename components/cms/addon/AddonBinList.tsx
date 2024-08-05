// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { ImageDocument } from "@/schemas/cms/image";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import Image from "next/image";

// styles
import { BinActions } from "../service/BinActions";

export default function AddonBinList({
  offset,
  addons,
  onRestore,
  onDelete
}: {
  offset: number;
  addons: AddonDocument[];
  onRestore: (addonId: string) => void;
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
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };

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
    // actions -------------------------------------
    row.push({
      label: {
        label: (
          <BinActions
            onRestore={() => {
              onRestore(addon?._id);
            }}
            onDelete={() => {
              onDelete(addon?._id);
            }}
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
