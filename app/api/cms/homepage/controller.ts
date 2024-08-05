// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { HomepageLayouts: HomepageLayout } =
  MODELS;

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import { QueryParamsType } from "@/types/cms/api";

export const getHomepageLayouts = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: HomepageLayoutDocument[];
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await HomepageLayout.find(
        query
      ).countDocuments();
    const homepageLayouts =
      await HomepageLayout.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate(
          populate
            ? [
                {
                  path: "banners",
                  populate: [
                    {
                      path: "desktop",
                      select: "alt defaultAlt url"
                    },
                    {
                      path: "mobile",
                      select: "alt defaultAlt url"
                    }
                  ]
                },
                {
                  path: "sections",
                  populate: {
                    path: "linkImages",
                    populate: {
                      path: "image",
                      select:
                        "alt defaultAlt url",
                      strictPopulate: false
                    }
                  }
                }
              ]
            : []
        );

    return {
      count: count,
      data: homepageLayouts
    };
  } catch (error) {
    console.error(
      "Error getting Homepage Layouts:",
      error
    );

    return null;
  }
};

export const getHomepageLayout = async (
  homepageLayoutId: string
): Promise<HomepageLayoutDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const homepageLayout =
      await HomepageLayout.findOne({
        _id: homepageLayoutId,
        isDeleted: false
      }).populate([
        {
          path: "banners",
          populate: [
            {
              path: "desktop",
              select: "alt defaultAlt url"
            },
            {
              path: "mobile",
              select: "alt defaultAlt url"
            }
          ]
        },
        {
          path: "sections",
          populate: {
            path: "linkImages",
            populate: {
              path: "image",
              select: "alt defaultAlt url",
              strictPopulate: false
            }
          }
        }
      ]);

    return homepageLayout;
  } catch (error: any) {
    console.error(
      "Error getting Homepage Layout:",
      error
    );

    return null;
  }
};

export const addHomepageLayout = async (
  addData: HomepageLayoutDocument
): Promise<HomepageLayoutDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newHomepageLayout = new HomepageLayout(
      addData
    );

    const homepageLayout =
      await newHomepageLayout.save();

    return homepageLayout;
  } catch (error) {
    console.error(
      "Error Adding Homepage Layout:",
      error
    );

    return null;
  }
};

export const updateHomepageLayout = async (
  homepageLayoutId: string,
  updateData: Partial<HomepageLayoutDocument>
): Promise<HomepageLayoutDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const homepageLayout =
      await HomepageLayout.findOneAndUpdate(
        {
          _id: homepageLayoutId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      ).populate([
        {
          path: "banners",
          populate: [
            {
              path: "desktop",
              select: "alt defaultAlt url"
            },
            {
              path: "mobile",
              select: "alt defaultAlt url"
            }
          ]
        },
        {
          path: "sections",
          populate: {
            path: "linkImages",
            populate: {
              path: "image",
              select: "alt defaultAlt url",
              strictPopulate: false
            }
          }
        }
      ]);

    return homepageLayout;
  } catch (error) {
    console.error(
      "Error updating Homepage Layout:",
      error
    );

    return null;
  }
};

export const reorderHomepageLayouts = async (
  homepageLayout1Id: string,
  homepageLayout2Id: string
): Promise<HomepageLayoutDocument[]> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const [homepageLayout1, homepageLayout2] =
      await Promise.all([
        HomepageLayout.findById(
          homepageLayout1Id
        ),
        HomepageLayout.findById(homepageLayout2Id)
      ]);

    if (!homepageLayout1 || !homepageLayout2) {
      return [];
    }

    // reorder
    const tempOrder1 = homepageLayout1.order;
    const tempOrder2 = homepageLayout2.order;

    [
      homepageLayout1.order,
      homepageLayout2.order
    ] = [999999998, 999999999];

    // DB update
    await Promise.all([
      homepageLayout1.save(),
      homepageLayout2.save()
    ]);

    [
      homepageLayout1.order,
      homepageLayout2.order
    ] = [tempOrder2, tempOrder1];

    const updatedHomepageLayouts =
      await Promise.all([
        homepageLayout1.save(),
        homepageLayout2.save()
      ]);

    return updatedHomepageLayouts;
  } catch (error) {
    console.error(
      "Error reordering Homepage Layouts:",
      error
    );

    return [];
  }
};

export const deleteHomepageLayout = async (
  homepageLayoutId: string
): Promise<HomepageLayoutDocument | null> => {
  try {
    await connectDB();

    const homepageLayout =
      await HomepageLayout.findOneAndUpdate(
        {
          _id: homepageLayoutId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return homepageLayout;
  } catch (error) {
    console.error(
      "Error Deleting Homepage Layout:",
      error
    );

    return null;
  }
};
