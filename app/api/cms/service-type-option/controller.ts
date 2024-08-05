// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { ServiceTypeOptions: ServiceTypeOption } =
  MODELS;

// types
import { ServiceTypeOptionDocument } from "@/schemas/cms/serviceTypeOption";
import { QueryParamsType } from "@/types/cms/api";

export const getServiceTypeOptions = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ServiceTypeOptionDocument[];
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

    const query: any = {
      isDeleted: false
    };

    if (keyword) {
      if (filterBy) {
        query[filterBy] = {
          $regex: new RegExp(keyword, "i")
        };
      } else {
        query.$text = { $search: keyword };
      }
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
      sort.value = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await ServiceTypeOption.find(
        query
      ).countDocuments();
    const serviceTypeOptions =
      await ServiceTypeOption.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: serviceTypeOptions
    };
  } catch (error) {
    console.error(
      "Error getting Service Type Options:",
      error
    );

    return null;
  }
};

export const getServiceTypeOption = async (
  serviceTypeOptionId: string
): Promise<ServiceTypeOptionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const serviceTypeOption =
      await ServiceTypeOption.findOne({
        _id: serviceTypeOptionId,
        isDeleted: false
      });

    return serviceTypeOption;
  } catch (error: any) {
    console.error(
      "Error getting Service Type Option:",
      error
    );

    return null;
  }
};

export const addServiceTypeOption = async (
  addData: ServiceTypeOptionDocument
): Promise<ServiceTypeOptionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newServiceTypeOption =
      new ServiceTypeOption(addData);

    const serviceTypeOption =
      await newServiceTypeOption.save();

    return serviceTypeOption;
  } catch (error) {
    console.error(
      "Error Adding Service Type Option:",
      error
    );

    return null;
  }
};

export const updateServiceTypeOption = async (
  serviceTypeOptionId: string,
  updateData: Partial<ServiceTypeOptionDocument>
): Promise<ServiceTypeOptionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const serviceTypeOption =
      await ServiceTypeOption.findOneAndUpdate(
        {
          _id: serviceTypeOptionId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return serviceTypeOption;
  } catch (error) {
    console.error(
      "Error updating Service Type Option:",
      error
    );

    return null;
  }
};

export const deleteServiceTypeOption = async (
  serviceTypeOptionId: string
): Promise<ServiceTypeOptionDocument | null> => {
  try {
    await connectDB();

    const serviceTypeOption =
      await ServiceTypeOption.findOneAndUpdate(
        {
          _id: serviceTypeOptionId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return serviceTypeOption;
  } catch (error) {
    console.error(
      "Error Deleting Service Type Option:",
      error
    );

    return null;
  }
};
