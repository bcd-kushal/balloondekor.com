// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Reviews, ServiceCategories } = MODELS;

// types
import { ReviewDocument } from "@/schemas/cms/review";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getReviews = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ReviewDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      populate,
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
      if (filterBy === "serviceCategory") {
        if (keyword) {
          const serviceCategories =
            await ServiceCategories.find({
              name: {
                $regex: new RegExp(keyword, "i")
              }
            });

          if (serviceCategories.length) {
            query[filterBy] =
              serviceCategories[0]._id;
          }
        }
      } else {
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
      await Reviews.find(query).countDocuments();
    const reviews = await Reviews.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate({
        ...(populate
          ? { path: "serviceCategory" }
          : {
              path: "",
              strictPopulate: false
            })
      });

    return {
      count: count,
      data: reviews
    };
  } catch (error) {
    console.error(
      "Error getting Reviews:",
      error
    );

    return null;
  }
};

export const getReview = async (
  reviewId: string
): Promise<ReviewDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const review = await Reviews.findOne({
      _id: reviewId,
      isDeleted: false
    }).populate({ path: "serviceCategory" });

    return review;
  } catch (error: any) {
    console.error("Error getting Review:", error);

    return null;
  }
};

export const addReview = async (
  addData: ReviewDocument
): Promise<ReviewDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newReview = new Reviews(addData);

    const review = await newReview.save();

    return review;
  } catch (error) {
    console.error("Error Adding Review:", error);

    return null;
  }
};

export const updateReview = async (
  reviewId: string,
  updateData: Partial<ReviewDocument>
): Promise<ReviewDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const review = await Reviews.findOneAndUpdate(
      {
        _id: reviewId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return review;
  } catch (error) {
    console.error(
      "Error updating Review:",
      error
    );

    return null;
  }
};

export const deleteReview = async (
  reviewId: string
): Promise<ReviewDocument | null> => {
  try {
    await connectDB();

    const review = await Reviews.findOneAndUpdate(
      {
        _id: reviewId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return review;
  } catch (error) {
    console.error(
      "Error Deleting Review:",
      error
    );

    return null;
  }
};

export const getReviewOptions = async (): Promise<
  OptionType[] | null
> => {
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
    const reviews =
      await Reviews.find(query).sort(sort);

    return reviews.map(
      ({ _id, reviewCategory }) => ({
        label: reviewCategory,
        value: _id
      })
    );
  } catch (error) {
    console.error(
      "Error getting Review Options:",
      error
    );

    return null;
  }
};
