import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { CouponDocument } from "@/schemas/cms/coupon";
import moment from "moment";
import { AddonActions } from "../../addon/AddonAction";
import { usePathname } from "next/navigation";
import {
  BinSVG,
  PenSVG,
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import Link from "next/link";
import { TableModalWrapperButton } from "@/components/common/table/admin/TableModalWrapper";

export default function CouponList({
  offset,
  coupons,
  activateCoupon,
  deleteCoupon
}: {
  offset: number;
  coupons: CouponDocument[];
  activateCoupon: (
    id: string,
    status: "active" | "inactive"
  ) => void;
  deleteCoupon: (id: string) => void;
}) {
  const currPath = usePathname();

  const tableData: tableDataType = {
    header: [
      { label: "Coupon Code", span: 2.5 },
      { label: "Type", span: 2, align: "left" },
      {
        label: "Deduction",
        span: 2,
        align: "left"
      },
      {
        label: "Min amount",
        span: 1.5,
        align: "left"
      },
      {
        label: "Max discount",
        span: 1.5,
        align: "left"
      },
      {
        label: "Valid until",
        span: 1.5,
        align: "left"
      },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  tableData.data = coupons.map(
    ({
      type,
      code,
      description,
      minimumOrderAmount,
      limitPerCustomer,
      valid,
      discount,
      applicableCategories,
      isActive,
      isDeleted,
      _id
    }) => {
      const arr: TableDataRowType = [
        // coupon code -----------------------------------
        {
          label: {
            label: code,
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // type -----------------------------------
        {
          label: {
            label: (
              <DeliveryTypeTag
                tag={
                  type === "free-delivery"
                    ? type
                    : discount?.type === "fixed"
                      ? "flat"
                      : "percentage"
                }
              />
            ),
            type: "svg",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // deduction -----------------------------------
        {
          label: {
            label:
              type === "free-delivery"
                ? "-"
                : discount?.type === "fixed"
                  ? `₹ ${discount?.amount}`
                  : `${discount?.percentage}%`,
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // min amount -----------------------------------
        {
          label: {
            label: `₹ ${minimumOrderAmount}`,
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // max discount -----------------------------------
        {
          label: {
            label:
              type === "free-delivery"
                ? "-"
                : discount?.type === "fixed"
                  ? `-`
                  : `₹ ${discount?.amount}`,
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // valid until -----------------------------------
        {
          label: {
            label: moment(valid.till).format(
              "Do MMM 'YY"
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // actions -----------------------------------
        {
          label: {
            label: (
              <>
                <span className="flex gap-8 items-center justify-center h-full w-full">
                  <span
                    onClick={() =>
                      activateCoupon(
                        _id,
                        isActive
                          ? "inactive"
                          : "active"
                      )
                    }
                  >
                    {isActive ? (
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
                    )}
                  </span>

                  {/* edit btn  ======================== */}
                  <Link
                    href={`${currPath}/edit/${_id}`}
                  >
                    <PenSVG dimensions={16} />
                  </Link>

                  {/* delete ============================= */}
                  <TableModalWrapperButton
                    type="action"
                    label={
                      <BinSVG dimensions={16} />
                    }
                    modalTitle="Confirm delete"
                    onClickTrigger={() => {
                      deleteCoupon(_id);
                    }}
                    modalType="destructive"
                  />
                </span>
              </>
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
}

export function DeliveryTypeTag({
  tag
}: {
  tag: "free-delivery" | "percentage" | "flat";
}) {
  return (
    <span
      className={`capitalize font-medium text-white py-[2px] px-[8px] rounded-xl text-[12px] ${tag === "free-delivery" ? "bg-lime-600" : tag === "percentage" ? "bg-amber-500" : "bg-purple-500"}`}
    >
      {tag.split("-").join(" ")}
    </span>
  );
}
