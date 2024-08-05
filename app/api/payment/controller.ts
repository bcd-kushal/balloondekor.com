// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Customers, OrderDetails, Orders } =
  MODELS;

// types
import {
  OrderDataType,
  UpdateOrderDataType
} from "@/types/payment/order";

function generateFiveDigitNumber(): number {
  return (
    Math.floor(
      Math.random() * (99999 - 10000 + 1)
    ) + 10000
  );
}

const generateOrderId = (): string => {
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(2, 4);
  const month = (new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const random = generateFiveDigitNumber();

  return `BD${year}${month}${random}`;
};

export const generateOrder = async (
  orderData: OrderDataType
): Promise<boolean> => {
  // create new session
  const session = await (
    await connectDB()
  ).startSession();

  let isOrderGenerated = false;
  let attemptCount = 1;

  const {
    status,
    gateway,
    gatewayResponse,
    percentage,
    amount,
    orderDetailId,
    customerId
  } = orderData;

  while (
    isOrderGenerated === false &&
    attemptCount <= 5
  ) {
    try {
      // DB query
      await session.withTransaction(async () => {
        const orderDetail =
          await OrderDetails.findByIdAndUpdate(
            orderDetailId,
            {
              isOrdered: true
            },
            {
              new: true,
              session
            }
          );

        const newOrder = new Orders({
          id: generateOrderId(),
          detail: orderDetailId,
          payment: {
            status:
              status === "failed"
                ? "pending"
                : "completed",
            percentage,
            amount,
            gateway: {
              name: gateway,
              info: gatewayResponse
            }
          }
        });

        const order = await newOrder.save({
          session
        });

        const customer =
          await Customers.findByIdAndUpdate(
            customerId,
            {
              $unset: {
                cart: 1
              },
              $push: {
                orders: order._id
              }
            },
            {
              new: true,
              session
            }
          );

        await session.commitTransaction();

        isOrderGenerated = true;
      });
    } catch (error: any) {
      console.error(
        `Error Generating Order:
${error.message}`
      );

      attemptCount += 1;
    }
  }

  session.endSession();

  if (!isOrderGenerated) {
    console.log(`
[!IMPORTANT]
Order couldn't be created for a payment
payment status -> ${status},
payment gateway -> ${gateway},
payment gateway response -> ${JSON.stringify(gatewayResponse)},
payment percentage -> ${percentage},
payment amount -> ${amount},
cart id -> ${orderDetailId},
customer id -> ${customerId}
`);
  }

  return isOrderGenerated;
};

export const updateOrder = async (
  orderId: string,
  updateOrderData: UpdateOrderDataType
): Promise<boolean> => {
  // create new session
  const session = await (
    await connectDB()
  ).startSession();

  let isOrderUpdated = false;
  let attemptCount = 1;

  const { gateway, gatewayResponse } =
    updateOrderData;

  while (
    isOrderUpdated === false &&
    attemptCount <= 5
  ) {
    try {
      // DB query
      await session.withTransaction(async () => {
        const order =
          await Orders.findByIdAndUpdate(
            orderId,
            {
              "payment.status": "completed",
              "payment.gateway": {
                name: gateway,
                info: gatewayResponse
              }
            },
            {
              new: true,
              session
            }
          );

        await session.commitTransaction();

        isOrderUpdated = true;
      });
    } catch (error: any) {
      console.error(
        `Error Generating Order:
  ${error.message}`
      );

      attemptCount += 1;
    }
  }

  session.endSession();

  if (!isOrderUpdated) {
    console.log(`
  [!IMPORTANT]
  Order couldn't be updated for a payment
  order id -> ${orderId},
  payment status -> success,
  payment gateway -> ${gateway},
  payment gateway response -> ${JSON.stringify(gatewayResponse)}
  `);
  }

  return isOrderUpdated;
};
