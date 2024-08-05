// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Customers } = MODELS;

// types
import { CustomerDocument } from "@/schemas/cms/customer";

export const getCustomer = async (
  customerId: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      _id: customerId
    }).select([
      "mobileNumber",
      "name",
      "mail",
      "password",
      "address",
      "pinCode",
      "gender",
      "cart",
      "orders",
      "availedCoupons"
    ]);

    return customer;
  } catch (error: any) {
    console.error(
      "Error getting Customer:",
      error
    );

    return null;
  }
};

export const updateCustomer = async (
  customerId: string,
  updateData: Partial<CustomerDocument>
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    if (
      updateData?.mobileNumber ||
      updateData?.mail
    ) {
      const existingCustomer =
        await Customers.findOne({
          $or: [
            ...(updateData?.mobileNumber
              ? [
                  {
                    mobileNumber:
                      updateData.mobileNumber
                  }
                ]
              : []),
            ...(updateData?.mail
              ? [
                  {
                    mail: updateData.mail
                  }
                ]
              : [])
          ]
        });

      if (
        existingCustomer &&
        existingCustomer._id.toString() !==
          customerId
      ) {
        return null;
      }
    }

    // DB update
    const customer =
      await Customers.findOneAndUpdate(
        {
          _id: customerId
        },
        updateData,
        {
          new: true
        }
      );

    return customer;
  } catch (error) {
    console.error(
      "Error updating Customer:",
      error
    );

    return null;
  }
};

export const updateCustomerPassword = async (
  customerId: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const customer = await Customers.findOne({
      _id: customerId,
      password: currentPassword
    });

    if (!customer) {
      return false;
    }

    await Customers.findByIdAndUpdate(
      customerId,
      {
        password: newPassword
      }
    );

    return true;
  } catch (error) {
    console.error(
      "Error updating Customer Password:",
      error
    );

    return false;
  }
};

export const getCustomerFromMobile = async (
  mobileNumber: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      mobileNumber
    }).select(["name"]);

    return customer;
  } catch (error: any) {
    console.error(
      "Error getting Customer From Mobile Number:",
      error
    );

    return null;
  }
};

export const getCustomerFromMail = async (
  mail: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      mail
    }).select(["name"]);

    return customer;
  } catch (error: any) {
    console.error(
      "Error getting Customer From Mail:",
      error
    );

    return null;
  }
};
