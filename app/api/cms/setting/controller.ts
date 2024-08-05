// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Settings } = MODELS;

// types
import { SettingDocument } from "@/schemas/cms/setting";

export const getSettings =
  async (): Promise<SettingDocument | null> => {
    try {
      // check or set DB connection
      await connectDB();

      // DB query
      const settings = await Settings.find({});

      return settings[0] || null;
    } catch (error) {
      console.error(
        "Error getting Settings:",
        error
      );

      return null;
    }
  };

export const addSettings = async (
  addData: SettingDocument
): Promise<SettingDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newSettings = new Settings(addData);

    const settings = await newSettings.save();

    return settings;
  } catch (error) {
    console.error(
      "Error Adding Settings:",
      error
    );

    return null;
  }
};

export const updateSettings = async (
  settingsId: string,
  updateData: Partial<SettingDocument>
): Promise<SettingDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let settings =
      await Settings.findOneAndUpdate(
        {
          _id: settingsId
        },
        updateData,
        {
          new: true
        }
      );

    return settings;
  } catch (error) {
    console.error(
      "Error updating Settings:",
      error
    );

    return null;
  }
};
