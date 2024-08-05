"use server";

// libraries
import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";

export const getCustomerAuthCookie =
  async (): Promise<string | undefined> => {
    const authToken = cookies().get(
      CUSTOMER_AUTH_COOKIE_NAME
    )?.value;

    if (authToken) {
      const tokenValues = verify(
        authToken,
        jwtSecret
      );

      if (tokenValues) {
        return (tokenValues as JwtPayload)
          ?.id as string;
      }
    }

    return;
  };
