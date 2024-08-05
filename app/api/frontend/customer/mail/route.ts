import { NextResponse } from "next/server";
import { getCustomerFromMail } from "../controller";

export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const { mail } = await req.json();

    const customer =
      await getCustomerFromMail(mail);

    return NextResponse.json(
      {
        data: customer,
        status: [
          {
            message: customer
              ? "Customer found"
              : "Customer not found",
            type: "success"
          }
        ]
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      `Error getting customer by Mail: ${err}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't get customer by Mail"
          }
        ]
      },
      { status: 500 }
    );
  }
};
