import { NextResponse } from "next/server";
import { getCustomerFromMobile } from "../controller";

export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const { mobileNumber } = await req.json();

    const customer =
      await getCustomerFromMobile(mobileNumber);

    return NextResponse.json(
      {
        data: customer,
        status: [
          {
            message: customer
              ? "Customer found"
              : "Customer Not Found",
            type: "success"
          }
        ]
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      `Error getting customer by mobile number: ${err}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't get customer by mobile"
          }
        ]
      },
      { status: 500 }
    );
  }
};
