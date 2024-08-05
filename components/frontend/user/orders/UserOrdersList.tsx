import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import {
  DownloadSVG,
  EyeOnSVG
} from "@/constants/svgs/svg";
import { OrderDocument } from "@/schemas/cms/order";
import moment from "moment";
import { useEffect, useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { OrderInQuestionType } from "./utils/types";
import { DEFAULT_ORDER_STATE_DATA } from "./utils/constants";
import { getCleanOrderData } from "./utils/helpers/getCleanOrderData";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { calculateOverallPrice } from "@/components/cms/orders/utils/helpers/calculateOverallPrice";
import { CouponDocument } from "@/schemas/cms/coupon";
import RetryPaymentUI from "@/payment/RetryPaymentUI";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { UpdateOrderDataType } from "@/types/payment/order";
import { generateInvoicePdf } from "@/fetchAPIs/frontend/generateInvoice";

export default function UserOrdersList({
  orders
}: {
  orders: OrderDocument[];
}) {
  const {
    customer: {
      data: { info: customerInfo }
    },
    order: {
      action: { onRetryPaymentOrder }
    }
  } = useCustomerContext();

  const [showOrderDetails, setShowOrderDetails] =
    useState<boolean>(false);
  const [orderInQuestion, setOrderInQuestion] =
    useState<OrderInQuestionType>(
      DEFAULT_ORDER_STATE_DATA
    );

  const [currentOrderId, setCurrentOrderId] =
    useState<string>("");
  const [
    currentOrderPayableAmount,
    setCurrentOrderPayableAmount
  ] = useState<number>(NaN);
  const [
    showPaymentGateway,
    setShowPaymentGateway
  ] = useState<boolean>(false);
  const [gatewayAction, setGatewayAction] =
    useState<{ id: string; toPay: number }>({
      id: "",
      toPay: 0
    });
  const [pdfBlob, setPdfBlob] = useState<Blob>();

  useEffect(() => {
    if (pdfBlob) {
      const url =
        window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, [pdfBlob]);

  let reversedOrders: OrderDocument[] = [],
    index = 0;

  for (let i = orders.length - 1; i >= 0; i--) {
    reversedOrders[index] = orders[i];
    index += 1;
  }

  const tableData: tableDataType = {
    header: [
      { label: "Order no.", span: 1.6 },
      {
        label: "Total amount",
        span: 1.2,
        align: "left"
      },
      {
        label: "Amount due",
        span: 1.2,
        align: "left"
      },
      {
        label: "Booked on",
        span: 1.4,
        align: "left"
      },
      {
        label: "Details",
        span: 1.1
      },
      {
        label: "Payment",
        span: 1.3
      }
    ],
    data: reversedOrders.map(
      ({
        _id,
        id: orderId,
        createdAt,
        detail,
        payment
      }) => {
        const priceSummary =
          calculateOverallPrice(
            (detail as OrderDetailDocument)
              .lineItems,
            payment.percentage,
            (detail as OrderDetailDocument)
              .appliedCoupon
              ? ((detail as OrderDetailDocument)
                  .appliedCoupon as CouponDocument)
              : undefined
          );

        const arr: TableDataRowType = [
          // ORDER NO. =====================================================
          {
            label: {
              label: orderId,
              type: "text",
              align: "left"
            },
            action: {
              action: <></>,
              type: "none"
            }
          },
          // TOTAL AMOUNT =====================================================
          {
            label: {
              label: `₹ ${priceSummary.finalAmount.toPay + priceSummary.finalAmount.raw}`,
              type: "text",
              align: "left"
            },
            action: {
              action: <></>,
              type: "none"
            }
          },
          // AMOUNT DUE =====================================================
          {
            label: {
              label: (
                <span
                  className={`${priceSummary.finalAmount.raw > 0 ? "group-hover:text-red-700 transition-colors duration-300 text-red-500" : ""}`}
                >
                  ₹ {priceSummary.finalAmount.raw}
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
          // PURCHASE DATE =====================================================
          {
            label: {
              label: moment(createdAt).format(
                "Do MMM, YYYY"
              ),
              type: "text",
              align: "left"
            },
            action: {
              action: <></>,
              type: "none"
            }
          },
          // DETAILS =====================================================
          {
            label: {
              label: (
                <div className="flex items-center justify-center gap-[10px]">
                  <span
                    onClick={() => {
                      setOrderInQuestion(
                        (prev) => ({
                          ...getCleanOrderData({
                            _id,
                            orderId,
                            createdAt,
                            detail:
                              detail as OrderDetailDocument,
                            payment
                          }),
                          paymentStatus:
                            payment.status
                        })
                      );
                      setShowOrderDetails(
                        (prev) => true
                      );
                      setGatewayAction(
                        (prev) => ({
                          id: _id,
                          toPay:
                            priceSummary
                              .finalAmount.toPay
                        })
                      );
                    }}
                    className="transition-colors duration-300 cursor-pointer hover:text-pink-600 px-[6px]"
                  >
                    <EyeOnSVG />
                  </span>
                  <span
                    onClick={() => {
                      generateInvoicePdf({
                        name: "Someone"
                      }).then((res) =>
                        setPdfBlob((prev) => res)
                      );
                    }}
                    className="transition-colors duration-300 cursor-pointer hover:text-pink-600 px-[6px]"
                  >
                    <DownloadSVG />
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
          /*
           */
          // PAYMENT STATUS =====================================================
          {
            label: {
              label:
                payment.status === "completed" ? (
                  <span className="text-green-800">
                    Success
                  </span>
                ) : (
                  <span className="flex items-center  sm:gap-[6px] justify-center ">
                    <span className="text-red-500">
                      Failed
                    </span>
                    <span
                      className="underline underline-offset-2 transition-all duration-300 text-blue-600 hover:font-semibold"
                      onClick={() => {
                        setCurrentOrderId(_id);
                        setCurrentOrderPayableAmount(
                          priceSummary.finalAmount
                            .toPay
                        );
                        setShowPaymentGateway(
                          true
                        );
                      }}
                    >
                      (Retry)
                    </span>
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

        return arr;
      }
    )
  };

  return (
    <>
      <AdminTable
        data={tableData}
        mode="frontend"
      />
      <Dialog
        open={showOrderDetails}
        onOpenChange={() =>
          setShowOrderDetails(false)
        }
      >
        <DialogContent className="p-0 bg-transparent min-w-fit min-h-fit rounded-none focus:outline-none border-none outline-none">
          <OrderDetailsDialog
            {...orderInQuestion}
            handleRetryPayment={() => {
              setShowOrderDetails(false);
              setCurrentOrderId(gatewayAction.id);
              setCurrentOrderPayableAmount(
                gatewayAction.toPay
              );
              setShowPaymentGateway(true);
            }}
          />
        </DialogContent>
      </Dialog>
      {showPaymentGateway ? (
        <RetryPaymentUI
          orderId={currentOrderId}
          amount={currentOrderPayableAmount}
          customer={{
            name: customerInfo?.name || "user",
            mail: customerInfo?.mail || "",
            mobileNumber:
              customerInfo?.mobileNumber?.slice(
                3,
                13
              ) || ""
          }}
          onSuccess={(
            updateOrderData: UpdateOrderDataType
          ) => {
            onRetryPaymentOrder(
              currentOrderId,
              updateOrderData
            );
            setShowPaymentGateway(false);
            setCurrentOrderId("");
            setCurrentOrderPayableAmount(NaN);
          }}
          onDismiss={() => {
            setShowPaymentGateway(false);
            setCurrentOrderId("");
            setCurrentOrderPayableAmount(NaN);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
