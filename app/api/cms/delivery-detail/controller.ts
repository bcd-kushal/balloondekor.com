// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";

const { DeliveryDetails } = MODELS;

// types
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getDeliveryDetails = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: DeliveryDetailDocument[];
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
      await DeliveryDetails.find(
        query
      ).countDocuments();
    const deliveryDetail =
      await DeliveryDetails.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: deliveryDetail
    };
  } catch (error) {
    console.error(
      "Error getting Delivery Details:",
      error
    );

    return null;
  }
};

export const getDeliveryDetail = async (
  deliveryDetailId: string
): Promise<DeliveryDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const deliveryDetail =
      await DeliveryDetails.findOne({
        _id: deliveryDetailId,
        isDeleted: false
      });

    return deliveryDetail;
  } catch (error: any) {
    console.error(
      "Error getting Delivery Detail:",
      error
    );

    return null;
  }
};

export const addDeliveryDetail = async (
  addData: DeliveryDetailDocument
): Promise<DeliveryDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newDeliveryDetail = new DeliveryDetails(
      addData
    );

    const deliveryDetail =
      await newDeliveryDetail.save();

    return deliveryDetail;
  } catch (error) {
    console.error(
      "Error Adding Delivery Detail:",
      error
    );

    return null;
  }
};

export const updateDeliveryDetail = async (
  deliveryDetailId: string,
  updateData: Partial<DeliveryDetailDocument>
): Promise<DeliveryDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const deliveryDetail =
      await DeliveryDetails.findOneAndUpdate(
        {
          _id: deliveryDetailId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return deliveryDetail;
  } catch (error) {
    console.error(
      "Error updating Delivery Detail:",
      error
    );

    return null;
  }
};

export const deleteDeliveryDetail = async (
  deliveryDetailId: string
): Promise<DeliveryDetailDocument | null> => {
  try {
    await connectDB();

    const deliveryDetail =
      await DeliveryDetails.findOneAndUpdate(
        {
          _id: deliveryDetailId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return deliveryDetail;
  } catch (error) {
    console.error(
      "Error Deleting Delivery Detail:",
      error
    );

    return null;
  }
};

export const getDeliveryDetailOptions =
  async (): Promise<OptionType[] | null> => {
    try {
      // check or set DB connection
      await connectDB();

      // query
      const query: any = {
        isDeleted: false,
        isActive: true
      };

      const sort: any = {
        name: 1
      };

      // DB query
      const deliveryDetails =
        await DeliveryDetails.find(query).sort(
          sort
        );

      return deliveryDetails.map(
        ({ _id, label }) => ({
          label,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Delivery Detail Options:",
        error
      );

      return null;
    }
  };
