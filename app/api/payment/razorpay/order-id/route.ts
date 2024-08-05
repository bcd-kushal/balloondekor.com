export const dynamic = "force-dynamic";

import getRazorpay from "@/payment/razorpay";
import {
  NextRequest,
  NextResponse
} from "next/server";

type OrderIdDataType = {
  amount: number;
};

const razorpay = getRazorpay();

// handle get order
export const POST = async (
  req: NextRequest
): Promise<
  NextResponse<{ orderId: string | null }>
> => {
  const { amount } =
    (await req.json()) as OrderIdDataType;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    return NextResponse.json(
      { orderId: order.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { orderId: null },
      { status: 500 }
    );
  }
};
