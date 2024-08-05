// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Customers } = MODELS;

import { CustomerDocument } from "@/schemas/cms/customer";

// env variables
const DOMAIN: string | undefined =
  process.env.NEXT_PUBLIC_BALLOONDEKOR_DOMAIN;
const GOOGLE_CLIENT_ID: string | undefined =
  process.env
    .NEXT_PUBLIC_BALLOONDEKOR_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined =
  process.env
    .NEXT_PUBLIC_BALLOONDEKOR_GOOGLE_CLIENT_SECRET;

// controllers
export const verify = async (
  code: string
): Promise<CustomerDocument | null> => {
  try {
    await connectDB();

    // google
    const token = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          client_id: GOOGLE_CLIENT_ID as string,
          client_secret:
            GOOGLE_CLIENT_SECRET as string,
          redirect_uri: DOMAIN as string
        })
      }
    ).then((response) => response.json());

    if (!token) {
      // console.log({ token });

      return null;
    }

    const data = await fetch(
      `https://openidconnect.googleapis.com/v1/userinfo?access_token=${token.access_token}`
    ).then((res) => res.json());

    if (!data || !data?.email) {
      // console.log({ data });

      return null;
    }

    const customer = await Customers.findOne({
      mail: data?.email
    });

    if (!customer) {
      const newCustomer = new Customers({
        name: data?.name,
        mail: data?.email
      });

      const customer = await newCustomer.save();

      return customer;
    }

    return customer;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};
