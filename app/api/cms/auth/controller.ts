// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Admins: Admin } = MODELS;

// types
import { AdminDocument } from "@/schemas/cms/admin";

// controllers
export const getAdmin = async (
  userName: string,
  password: string,
  answer: string
): Promise<AdminDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const admin = await Admin.find({
      userName,
      password,
      answer
    });

    return admin[0] || null;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};
