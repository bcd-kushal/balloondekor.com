// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Leads } = MODELS;

// types
import { LeadDocument } from "@/schemas/cms/lead";
import { QueryParamsType } from "@/types/cms/api";

export const getLeads = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: LeadDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword,
      fromDate,
      toDate
    } = queryParams;

    const query: any = {};

    if (filterBy) {
      if (filterBy === "status") {
        if (keyword !== "all") {
          query.status = keyword;
        }
      } else {
        query[filterBy] = {
          $regex: new RegExp(keyword || "", "i")
        };
      }
    }

    if (!filterBy && keyword) {
      query.$text = { $search: keyword };
    }

    if (fromDate || toDate) {
      query.createdAt = {
        ...(fromDate
          ? { $gte: new Date(fromDate) }
          : {}),
        ...(toDate
          ? { $lt: new Date(toDate) }
          : {})
      };
    }

    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = orderBy === "asc" ? 1 : -1;
    } else {
      sort.submittedAt =
        orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await Leads.find(query).countDocuments();
    const leads = await Leads.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: leads
    };
  } catch (error) {
    console.error("Error getting Leads:", error);

    return null;
  }
};

export const updateLead = async (
  leadId: string,
  updateData: Partial<LeadDocument>
): Promise<LeadDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const lead = await Leads.findOneAndUpdate(
      {
        _id: leadId
      },
      updateData,
      {
        new: true
      }
    );

    return lead;
  } catch (error) {
    console.error("Error updating Lead:", error);

    return null;
  }
};
