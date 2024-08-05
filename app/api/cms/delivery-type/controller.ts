// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { DeliveryTypes } = MODELS;

// types
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { QueryParamsType } from "@/types/cms/api";

export const getDeliveryTypes = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: DeliveryTypeDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      active,
      deleted,
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

    if (active) {
      query.isActive = true;
    }

    if (deleted) {
      query.isDeleted = true;
    }

    if (filterBy) {
      query[filterBy] =
        filterBy === "isActive"
          ? keyword === "false"
            ? false
            : true
          : {
              $regex: new RegExp(
                keyword || "",
                "i"
              )
            };
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
      sort.value = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await DeliveryTypes.find(
        query
      ).countDocuments();
    const deliveryTypes =
      await DeliveryTypes.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: deliveryTypes
    };
  } catch (error) {
    console.error(
      "Error getting Delivery Types:",
      error
    );

    return null;
  }
};

export const getDeliveryType = async (
  deliveryTypeId: string
): Promise<DeliveryTypeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const deliveryType =
      await DeliveryTypes.findOne({
        _id: deliveryTypeId,
        isDeleted: false
      });

    return deliveryType;
  } catch (error: any) {
    console.error(
      "Error getting Delivery Type:",
      error
    );

    return null;
  }
};

export const addDeliveryType = async (
  addData: DeliveryTypeDocument
): Promise<DeliveryTypeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newDeliveryType = new DeliveryTypes(
      addData
    );

    const deliveryType =
      await newDeliveryType.save();

    return deliveryType;
  } catch (error) {
    console.error(
      "Error Adding Delivery Type:",
      error
    );

    return null;
  }
};

export const updateDeliveryType = async (
  deliveryTypeId: string,
  updateData: Partial<DeliveryTypeDocument>
): Promise<DeliveryTypeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const deliveryType =
      await DeliveryTypes.findOneAndUpdate(
        {
          _id: deliveryTypeId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return deliveryType;
  } catch (error) {
    console.error(
      "Error updating Delivery Type:",
      error
    );

    return null;
  }
};

export const deleteDeliveryType = async (
  deliveryTypeId: string
): Promise<DeliveryTypeDocument | null> => {
  try {
    await connectDB();

    const deliveryType =
      await DeliveryTypes.findOneAndUpdate(
        {
          _id: deliveryTypeId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return deliveryType;
  } catch (error) {
    console.error(
      "Error Deleting Delivery Type:",
      error
    );

    return null;
  }
};
