// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Leads } = MODELS;

// types
import { LeadDocument } from "@/schemas/cms/lead";

export const addLead = async (
  addData: LeadDocument
): Promise<LeadDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // check if existing lead
    const existingLead = await Leads.findOne({
      contactNumber: addData.contactNumber
    });

    if (existingLead) {
      // DB update
      const updatedLead =
        await Leads.findByIdAndUpdate(
          existingLead._id,
          {
            $inc: { count: 1 },
            status: "",
            submittedAt: new Date()
          },
          {
            new: true
          }
        );

      return updatedLead;
    } else {
      // DB insert
      const newLead = new Leads(addData);
      newLead.submittedAt = new Date();
      newLead.status = "";

      const lead = await newLead.save();

      return lead;
    }
  } catch (error) {
    console.error("Error Adding Lead:", error);

    return null;
  }
};

export const deleteLead = async (
  id: string
): Promise<boolean> => {
  try {
    // check or set DB connection
    await connectDB();

    // check if existing lead
    const deletionResponse =
      await Leads.findByIdAndDelete(id);
    if (deletionResponse) return true;
    return false;
  } catch (error) {
    console.error(
      "Error Deleting Callback:",
      error
    );
    return false;
  }
};
