import connectDB from "@/db/mongoose";
import { AllLeadsDocument } from "@/schemas/cms/allLeads";

// models
import MODELS from "@/db/models";
const { AllLeads } = MODELS;

export const addNewLead = async (
  leadData: AllLeadsDocument
) => {
  try {
    await connectDB();

    // if lead exists
    const leadExists = await AllLeads.findOne({
      mobile: leadData.mobile
    });

    if (leadExists) {
      const updateLead =
        await AllLeads.findOneAndUpdate(
          { mobile: leadData.mobile },
          leadData,
          { new: true }
        );

      return updateLead ? true : false;
    }

    const newLead = new AllLeads(leadData);
    newLead.submittedAt = new Date();

    const resLead = await newLead.save();

    return resLead ? true : false;
  } catch (err: any) {
    console.error({ err });

    return false;
  }
};

export const getAllLeads = async () => {
  try {
    await connectDB();

    const leadsData = await AllLeads.find({})
      .sort({
        createdAt: -1
      })
      .populate([
        {
          path: "city",
          select: ["name"],
          strictPopulate: false
        },
        {
          path: "cartItems.service",
          populate: [
            {
              path: "category",
              select: "name slug advancePayment",
              populate: [
                {
                  path: "advancePayment",
                  select: "label value"
                }
              ]
            },
            {
              path: "categories",
              select: "name slug"
            },
            {
              path: "media.primary",
              select: "alt defaultAlt url"
            },
            {
              path: "media.gallery",
              select: "alt defaultAlt url",
              strictPopulate: false
            },
            {
              path: "price.cities.city",
              select: "name"
            },
            {
              path: "media.review",
              select: "alt defaultAlt url",
              strictPopulate: false
            },
            {
              path: "details.deliveryDetails"
            },
            {
              path: "details.careInfo"
            },
            {
              path: "details.cancellationPolicy"
            },
            {
              path: "details.faq"
            },
            {
              path: "deliveryTime.orderProcessingTime",
              select: "label time"
            },
            {
              path: "deliveryTime.deliverySlots.deliveryType",
              select: "name timeSlots"
            },
            {
              path: "addons.addon",
              select: "name price isCustomizable",
              populate: [
                {
                  path: "category",
                  select: "name"
                },
                {
                  path: "image",
                  select: "alt defaultAlt url"
                }
              ]
            },
            {
              path: "variants.custom.unit",
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.image",
              select: "alt defaultAlt url",
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.price.cities.city",
              select: "name",
              strictPopulate: false
            }
          ],
          strictPopulate: false
        },
        {
          path: "cartItems.decorationTime.type",
          strictPopulate: false
        }
      ]);

    return leadsData;
  } catch (err: any) {
    return null;
  }
};

export const deleteThisLead = async (
  id: string
) => {
  try {
    await connectDB();
    const deletion =
      await AllLeads.findByIdAndDelete(id);

    if (!deletion) return false;
    return true;
  } catch (err: any) {
    console.error(
      `Failed to delete lead from controller: ${err}`
    );
    return false;
  }
};

export const updateLeadStatus = async ({
  id,
  newStatus
}: {
  id: string;
  newStatus:
    | ""
    | "interested"
    | "not-interested"
    | "in-progress";
}): Promise<boolean> => {
  try {
    await connectDB();

    const response =
      await AllLeads.findByIdAndUpdate(
        id,
        {
          status: newStatus
        },
        { new: true }
      );

    if (!response) return false;
    return true;
  } catch (err: any) {
    console.error(
      `Failed to update status of lead: ${err}`
    );
    return false;
  }
};
