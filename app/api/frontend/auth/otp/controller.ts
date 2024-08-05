// libraries
import {
  resendOTP,
  sendOTP,
  verifyOTP
  // @ts-ignore
} from "otpless-next-js-auth-sdk";

// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
import { CustomerDocument } from "@/schemas/cms/customer";
const { Customers } = MODELS;

// constants
import {
  OTP_LENGTH,
  RESEND_OTP_TIME
} from "@/constants/frontend/auth";

// env variables
const OTPLESS_CLIENT_ID: string | undefined =
  process.env.BALLOONDEKOR_OTPLESS_CLIENT_ID;
const OTPLESS_CLIENT_SECRET: string | undefined =
  process.env.BALLOONDEKOR_OTPLESS_CLIENT_SECRET;

// controllers
export const send = async (
  mobileNumber: string
): Promise<string> => {
  try {
    // OTPLESS query
    const response = await sendOTP(
      mobileNumber,
      null,
      "SMS",
      null,
      null,
      RESEND_OTP_TIME,
      OTP_LENGTH.toString(),
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    if (!response.orderId) {
      // console.log({
      //   sendOTPErrorResponse: response
      // });

      return "";
    }

    return response.orderId;
  } catch (error: any) {
    console.error(error);

    return "";
  }
};

export const resend = async (
  orderId: string
): Promise<string> => {
  try {
    // OTPLESS query
    const response = await resendOTP(
      orderId,
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    if (!response.orderId) {
      // console.log({
      //   resendOTPErrorResponse: response
      // });

      return "";
    }

    return response.orderId;
  } catch (error: any) {
    console.error(error);

    return "";
  }
};

export const verify = async (
  mobileNumber: string,
  orderId: string,
  otp: string
): Promise<CustomerDocument | null> => {
  try {
    await connectDB();

    // OTPLESS query
    const response = await verifyOTP(
      null,
      mobileNumber,
      orderId,
      otp,
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    if (!response.isOTPVerified) {
      // console.log({
      //   resendOTPErrorResponse: response
      // });

      return null;
    }

    const customer = await Customers.findOne({
      mobileNumber
    });

    if (!customer) {
      const newCustomer = new Customers({
        mobileNumber
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
