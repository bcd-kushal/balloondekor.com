export type OrderDataType = {
  status: "failed" | "success";
  gateway: "razorpay" | "payu";
  gatewayResponse: Record<string, unknown>;
  percentage: number;
  amount: number;
  orderDetailId: string;
  customerId: string;
};

export type UpdateOrderDataType = {
  gateway: "razorpay" | "payu";
  gatewayResponse: Record<string, unknown>;
};
