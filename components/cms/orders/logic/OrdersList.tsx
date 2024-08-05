import {
  OrderDocument,
  OrderPaymentDocument
} from "@/schemas/cms/order";
import { SetStateAction, useState } from "react";
import { LineItemStatusTypes } from "../OrdersPage";
import { useStatusContext } from "@/hooks/useStatusContext";
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { EyeOnSVG } from "@/constants/svgs/svg";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import moment from "moment";
import { ServiceDocument } from "@/schemas/cms/service";
import OrderFullDataDialog from "./OrderFullDataDialog";

export default function OrdersList({
  offset,
  orders,
  showStatus,
  setOrders,
  handleChangeOrderStatus
}: {
  offset: number;
  orders: OrderDocument[];
  showStatus: boolean;
  setOrders: React.Dispatch<
    SetStateAction<OrderDocument[]>
  >;
  handleChangeOrderStatus: ({
    orderId,
    orderDetailId,
    lineItemId,
    currStatus,
    newStatus
  }: {
    orderId: string;
    orderDetailId: string;
    lineItemId: string;
    currStatus: LineItemStatusTypes;
    newStatus: LineItemStatusTypes;
  }) => void;
}) {
  const { addStatus } = useStatusContext();

  const [showOrderDetails, setShowOrderDetails] =
    useState<boolean>(false);
  const [
    orderDetailsInQuestion,
    setOrderDetailsInQuestion
  ] = useState<OrderDocument>();
  const [
    lineItemInQuestion,
    setLineItemInQuestion
  ] = useState<string>("");

  const partialTableData: tableDataType = {
    header: [
      { label: "Order no.", span: 2 },
      {
        label: "Customer name",
        span: 2,
        align: "left"
      },
      {
        label: "Phone no.",
        span: 2.3,
        align: "left"
      },
      {
        label: "Event date",
        span: 2.3,
        align: "left"
      },
      {
        label: "Booking date",
        span: 2.3,
        align: "left"
      },
      {
        label: "Amount",
        span: 1.5,
        align: "left"
      },
      {
        label: "Payment%",
        span: 1.5,
        align: "left"
      },
      {
        label: "Details",
        span: 1
      }
    ],
    data: [],
    offset: offset
  };

  const tableData: tableDataType = showStatus
    ? {
        header: [
          ...partialTableData.header,
          {
            label: "Status",
            span: 2
          }
        ],
        data: [],
        offset: offset
      }
    : {
        header: [
          ...partialTableData.header,
          {
            label: "Status",
            span: 2
          }
        ],
        data: [],
        offset: offset
      };

  orders.forEach(
    ({ _id, id, payment, detail }) => {
      const ordersPartialList = (
        detail as OrderDetailDocument
      ).lineItems.map(
        ({
          quantity,
          eventDate,
          decorationTime,
          instruction,
          addons,
          status,
          service,
          customVariant,
          pricePerUnit,
          _id: lineItemId,
          createdAt
        }) => {
          const { checkoutInfo, city } =
            detail as OrderDetailDocument;

          const partialArr: TableDataRowType = [
            // ORDER NO. =====================================================
            {
              label: {
                label: id,
                type: "text"
              },
              action: {
                action: <></>,
                type: "none"
              }
            },
            // CUSTOMER NAME =====================================================
            {
              label: {
                label: (
                  <span className="max-w-fit line-clamp-1">
                    {
                      (
                        checkoutInfo as CheckoutInfoDocument
                      ).name
                    }
                  </span>
                ),
                type: "svg",
                align: "left"
              },
              action: {
                action: <></>,
                type: "none"
              }
            },
            // PHONE NO. =========================================================
            {
              label: {
                label: `+91 ${
                  (
                    checkoutInfo as CheckoutInfoDocument
                  ).mobileNumber
                }`,
                type: "text",
                align: "left"
              },
              action: {
                action: <></>,
                type: "component"
              }
            },
            // ORDER DATE ===========================================================
            {
              label: {
                label: moment(eventDate).format(
                  "ddd, DD MMM 'YY"
                ),
                type: "text",
                align: "left"
              },
              action: {
                action: <></>,
                type: "none"
              }
            },
            // BOOKING DATE ===========================================================
            {
              label: {
                label: moment(createdAt).format(
                  "ddd, DD MMM 'YY"
                ),
                type: "text",
                align: "left"
              },
              action: {
                action: <></>,
                type: "none"
              }
            },
            // AMOUNT =============================================================
            {
              label: {
                label: `₹ ${
                  quantity *
                  (pricePerUnit ||
                    (service as ServiceDocument)
                      .price.base.price)
                }`,
                type: "text",
                align: "left"
              },
              action: {
                action: <></>,
                type: "none"
              }
            },
            // PAYMENT % =============================================================
            {
              label: {
                label: (
                  <span
                    className={
                      (
                        payment as OrderPaymentDocument
                      ).percentage < 100
                        ? "text-red-500 group-hover:text-white/85 transition-all duration-300"
                        : ""
                    }
                  >
                    {
                      (
                        payment as OrderPaymentDocument
                      ).percentage
                    }
                    %
                  </span>
                ),
                type: "svg",
                align: "left"
              },
              action: {
                action: <></>,
                type: "component"
              }
            },
            // DETAILS =====================================================================
            {
              label: {
                label: (
                  <span
                    onClick={() => {
                      setShowOrderDetails(
                        (prev) => true
                      );
                      setOrderDetailsInQuestion(
                        (prev) =>
                          orders.find(
                            ({ _id: orderId }) =>
                              orderId === _id
                          )
                      );
                      setLineItemInQuestion(
                        (prev) => lineItemId
                      );
                    }}
                  >
                    <EyeOnSVG className="group-hover:stroke-white" />
                  </span>
                ),
                type: "svg"
              },
              action: {
                action: <></>,
                type: "component"
              }
            }
          ];

          const arr: TableDataRowType = showStatus
            ? [
                ...partialArr,
                // STATUS ====================================================================
                {
                  label: {
                    label: (
                      <>
                        <select
                          title="orderStatus"
                          defaultValue={status}
                          onChange={(e) =>
                            handleChangeOrderStatus(
                              {
                                orderId: _id,
                                orderDetailId: (
                                  detail as OrderDetailDocument
                                )._id,
                                lineItemId:
                                  lineItemId,
                                currStatus:
                                  status,
                                newStatus: e
                                  .target
                                  .value as LineItemStatusTypes
                              }
                            )
                          }
                          className="text-black outline-none transition-all duration-300 bg-transparent py-1.5 px-1.5 border-[1px] border-neutral-300 group-hover:bg-[#0075fe] group-hover:text-white group-hover:border-white/40  rounded-lg cursor-pointer"
                        >
                          <option value="completed">
                            Delivered
                          </option>
                          <option value="preparing">
                            In progress
                          </option>
                          <option value="cancelled">
                            Cancelled
                          </option>
                          <option value="ordered">
                            New order
                          </option>
                        </select>
                      </>
                    ),
                    type: "svg"
                  },
                  action: {
                    action: <></>,
                    type: "component"
                  }
                }
              ]
            : [
                ...partialArr,
                {
                  label: {
                    label: (
                      <span className="text-red-500 font-medium">
                        Failed
                      </span>
                    ),
                    type: "svg"
                  },
                  action: {
                    action: () => {},
                    type: "component"
                  }
                }
              ];

          return arr;
        }
      );

      ordersPartialList.forEach((partialList) =>
        tableData.data.push(partialList)
      );
    }
  );

  return (
    <>
      <AdminTable data={tableData} />
      <Dialog
        open={showOrderDetails}
        onOpenChange={() =>
          setShowOrderDetails(false)
        }
      >
        {orderDetailsInQuestion ? (
          <DialogContent className="p-0 bg-transparent min-w-fit min-h-fit rounded-none focus:outline-none border-none outline-none">
            <OrderFullDataDialog
              lineItemId={lineItemInQuestion}
              order={orderDetailsInQuestion}
            />
          </DialogContent>
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
}
