// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { BinActions } from "../service/BinActions";

export default function AddonCategoryBinList({
  offset,
  addonCategories,
  onRestore,
  onDelete
}: {
  offset: number;
  addonCategories: AddonCategoryDocument[];
  onRestore: (addonCategoryId: string) => void;
  onDelete: (addonCategoryId: string) => void;
}) {
  const addonsData: tableDataType = {
    header: [
      { label: "Addon", span: 5 },
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };

  const n = addonCategories.length;
  for (let i = 0; i < n; i++) {
    const addonCategory = addonCategories[i];
    const row: TableDataRowType = [];

    // name -------------------------------------
    row.push({
      label: {
        label: addonCategory?.name,
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
              onRestore(addonCategory?._id);
            }}
            onDelete={() => {
              onDelete(addonCategory?._id);
            }}
          />
        ),
        type: "svg"
      },
      action: { action: <></>, type: "component" }
    });

    addonsData.data.push(row);
  }

  return <AdminTable data={addonsData} />;
}
