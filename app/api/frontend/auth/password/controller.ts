// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Customers } = MODELS;

// types
import { CustomerDocument } from "@/schemas/cms/customer";

// controllers
export const checkCustomerRegistration = async (
  mail: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      mail
    });

    return customer || null;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};

export const getCustomer = async (
  mail: string,
  password: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      mail,
      password
    });

    return customer || null;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};

export const addCustomer = async (
  addData: CustomerDocument
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const existingCustomer =
      await Customers.findOne({
        mobileNumber: addData.mobileNumber
      });

    console.log({ existingCustomer });

    if (existingCustomer) {
      return null;
    }

    const newCustomer = new Customers(addData);

    const customer = await newCustomer.save();

    return customer;
  } catch (error) {
    console.error(
      "Error Adding Customer:",
      error
    );

    return null;
  }
};
