// components
import CareInfoItem from "@/components/cms/care-info/CareInfoItem";

// types
import { CareInfoDocument } from "@/schemas/cms/careInfo";

// styles
import styles from "@/components/cms/care-info/careInfoList.module.css";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { AddonActions } from "../addon/AddonAction";

export default function careInfoList({
  offset,
  careInfo,
  toggleActive,
  handleDelete
}: {
  offset: number;
  careInfo: CareInfoDocument[];
  toggleActive: (
    careInfoId: string,
    isActive: boolean
  ) => void;
  handleDelete: (careInfoId: string) => void;
}) {
  const tableData: tableDataType = {
    header: [
      {
        label: "Label",
        span: 3
      },
      { label: "Active", span: 1 },
      { label: "Actions", span: 1 }
    ],
    data: [],
    offset: offset
  };

  tableData.data = careInfo.map(
    ({ _id, label, isActive }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: label,
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: isActive ? (
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
            action: () =>
              toggleActive(_id, !isActive),
            type: "function"
          }
        },
        {
          label: {
            label: (
              <AddonActions
                href={{
                  editHref: `/cms/presets/care-info/edit/${_id}`,
                  viewHref: `#`
                }}
                alt={
                  isActive
                    ? "Active icon"
                    : "Inactive icon"
                }
                onDelete={() => {
                  handleDelete(_id);
                }}
                onLinkClick={() => {}}
              />
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        }
      ];

      return arr;
    }
  );

  return <AdminTable data={tableData} />;
  return (
    <div className={styles.container}>
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
          {careInfo.map(
            ({ _id, label, isActive }, i) => (
              <CareInfoItem
                key={_id}
                id={_id}
                srNo={offset + i + 1}
                label={label}
                isActive={isActive}
                onToggleActive={() =>
                  toggleActive(_id, !isActive)
                }
                onDelete={() => {
                  handleDelete(_id);
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
