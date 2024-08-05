// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Admins } = MODELS;

// types
import { AdminDocument } from "@/schemas/cms/admin";

export const getAdmin =
  async (): Promise<AdminDocument | null> => {
    try {
      // check or set DB connection
      await connectDB();

      const admins = await Admins.find({});

      return admins.length ? admins[0] : null;
    } catch (error) {
      console.error(
        "Error getting Admin:",
        error
      );

      return null;
    }
  };

export const updateAdmin = async (
  adminId: string,
  updateData: Partial<AdminDocument>
): Promise<AdminDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const admin = await Admins.findByIdAndUpdate(
      adminId,
      updateData,
      {
        new: true
      }
    );

    return admin;
  } catch (error) {
    console.error("Error updating Admin:", error);

    return null;
  }
};
