// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";

// styles
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { useStatusContext } from "@/hooks/useStatusContext";
import { ProductAction } from "../product/ProductAction";
import { usePathname } from "next/navigation";

export default function AddonCategoryList({
  offset,
  addonCategories,
  onToggleActive,
  onDelete
}: {
  offset: number;
  addonCategories: AddonCategoryDocument[];
  onToggleActive: (
    addonCategoryId: string,
    isActive: boolean
  ) => void;
  onDelete: (addonCategoryId: string) => void;
}) {
  const addonsData: tableDataType = {
    header: [
      { label: "Addon", span: 5 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };

  const currPath = usePathname();

  const n = addonCategories.length;
  for (let i = 0; i < n; i++) {
    const addon = addonCategories[i];
    const row: TableDataRowType = [];

    // name -------------------------------------
    row.push({
      label: {
        label: addon?.name,
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
          <ProductAction
            href={{
              editHref: `${currPath}/edit/${addon?._id}`,
              viewHref: `#`
            }}
            alt={""}
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

    addonsData.data.push(row);
  }

  return (
    <>
      <AdminTable data={addonsData} />
      {/* <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>sn</div>
        <div className={styles.heading}>
          label
        </div>
        <div className={styles.heading}>
          active
        </div>
        <div>action</div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.items}>
          {addonCategories.map(
            ({ _id, name, isActive }, i) => (
              <AddonCategoryItem
                key={_id}
                id={_id}
                srNo={offset + i + 1}
                name={name}
                isActive={isActive}
                onToggleActive={() => {
                  onToggleActive(_id, !isActive);
                }}
                onDelete={() => {
                  onDelete(_id);
                }}
              />
            )
          )}
        </div>
      </div>
    </div> */}
    </>
  );
}
