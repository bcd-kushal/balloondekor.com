// components
import HeaderLinkItem from "@/components/cms/header/HeaderLinkItem";

// types
import { NavLinkDocument } from "@/schemas/cms/navLink";

// styles
import styles from "@/components/cms/header/headerLinkList.module.css";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  ArrowDownIcon,
  ArrowUpIcon
} from "@radix-ui/react-icons";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { AddonActions } from "../addon/AddonAction";
import { usePathname } from "next/navigation";

export default function HeaderLinkList({
  offset,
  navLinks,
  onToggleActive,
  onReorder,
  onDelete
}: {
  offset: number;
  navLinks: NavLinkDocument[];
  onToggleActive: (
    occasionId: string,
    isActive: boolean
  ) => void;
  onReorder: (id1: string, id2: string) => void;
  onDelete: (occasionId: string) => void;
}) {
  const currPath = usePathname();
  const tableData: tableDataType = {
    header: [
      { label: "Label", span: 10 },
      { label: "Ordering", span: 4 },
      { label: "Active", span: 2 },
      { label: "Actions", span: 4 }
    ],
    data: navLinks.map(
      ({ _id, label, isActive }, i) => {
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
              label: (
                <div className="flex items-center justify-center gap-6 *:p-2 *:rounded-full">
                  <span
                    className="hover:bg-black/15"
                    onClick={
                      i > 0
                        ? () => {
                            onReorder(
                              navLinks[i - 1]._id,
                              _id
                            );
                          }
                        : () => {}
                    }
                  >
                    <ArrowUpIcon
                      width={16}
                      height={16}
                    />
                  </span>
                  <span
                    className="hover:bg-black/15"
                    onClick={
                      i < navLinks.length - 1
                        ? () => {
                            onReorder(
                              navLinks[i + 1]._id,
                              _id
                            );
                          }
                        : () => {}
                    }
                  >
                    <ArrowDownIcon
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              ),
              type: "svg"
            },
            action: {
              action: <></>,
              type: "component"
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
                onToggleActive(_id, !isActive),
              type: "function"
            }
          },
          {
            label: {
              label: (
                <AddonActions
                  href={{
                    editHref: `${currPath}/edit/${_id}`,
                    viewHref: `#`
                  }}
                  alt={
                    isActive
                      ? "Active icon"
                      : "Inactive icon"
                  }
                  onDelete={() => {
                    onDelete(_id);
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
    )
  };
  return (
    <>
      <AdminTable data={tableData} />
      {/* <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>sn</div>
        <div className={styles.heading}>
          label
        </div>
        <div className={styles.heading}>
          order
        </div>
        <div className={styles.heading}>
          active
        </div>
        <div>action</div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.items}>
          {navLinks.map(
            ({ _id, label, isActive }, i) => (
              <HeaderLinkItem
                key={_id}
                id={_id}
                srNo={offset + i + 1}
                label={label}
                isActive={isActive}
                onToggleActive={() =>
                  onToggleActive(_id, !isActive)
                }
                onMoveUp={
                  i > 0
                    ? () => {
                        onReorder(
                          navLinks[i - 1]._id,
                          _id
                        );
                      }
                    : () => {}
                }
                onMoveDown={
                  i < navLinks.length - 1
                    ? () => {
                        onReorder(
                          navLinks[i + 1]._id,
                          _id
                        );
                      }
                    : () => {}
                }
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
