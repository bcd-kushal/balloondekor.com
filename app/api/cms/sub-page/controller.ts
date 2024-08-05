// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { SubPages } = MODELS;

// types
import { OptionType } from "@/types/cms/form";
import { SubPageDocument } from "@/schemas/cms/subPage";
import { QueryParamsType } from "@/types/cms/api";

export const getSubPages = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: SubPageDocument[];
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
      if (filterBy.toLowerCase() === "page") {
        if (
          keyword &&
          keyword.toLowerCase() !== "all"
        ) {
          query.page = keyword;
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await SubPages.find(query).countDocuments();
    const subPages = await SubPages.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(
        populate
          ? [
              {
                path: "page",
                select: "category name slug",
                populate: [
                  {
                    path: "category",
                    select: "name slug"
                  }
                ]
              }
            ]
          : []
      );

    return {
      count: count,
      data: subPages
    };
  } catch (error) {
    console.error(
      "Error getting Sub Pages:",
      error
    );

    return null;
  }
};

export const getSubPage = async (
  subPageId: string
): Promise<SubPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const subPage = await SubPages.findOne({
      _id: subPageId,
      isDeleted: false
    }).populate([
      {
        path: "quickLinks",
        populate: {
          path: "image",
          select: "alt defaultAlt url",
          strictPopulate: false
        }
      },
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
        path: "services",
        populate: [
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          }
        ]
      }
    ]);

    return subPage;
  } catch (error: any) {
    console.error(
      "Error getting Sub Page:",
      error
    );

    return null;
  }
};

export const addSubPage = async (
  addData: SubPageDocument
): Promise<{
  ok: boolean;
  data: SubPageDocument | null;
  statusCode: number;
  message: string;
}> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const existingSubPage =
      await SubPages.findOne({
        page: addData.page,
        slug: addData.slug
      });

    if (existingSubPage) {
      return {
        ok: false,
        data: null,
        statusCode: 409,
        message:
          "Sub Page Name Already Exists For This Page"
      };
    }

    const newSubPage = new SubPages(addData);

    const subPage = await newSubPage.save();

    return {
      ok: true,
      data: subPage,
      statusCode: 201,
      message: ""
    };
  } catch (error) {
    console.error(
      "Error Adding Sub Page:",
      error
    );

    return {
      ok: false,
      data: null,
      statusCode: 500,
      message: "Server Error"
    };
  }
};

export const updateSubPage = async (
  subPageId: string,
  updateData: Partial<SubPageDocument>
): Promise<SubPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let subPage = await SubPages.findOneAndUpdate(
      {
        _id: subPageId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    ).populate([
      {
        path: "quickLinks",
        populate: {
          path: "image",
          select: "alt defaultAlt url",
          strictPopulate: false
        }
      },
      {
        path: "banners",
        populate: [
          {
            path: "desktop",
            select: "alt defaultAlt url",
            strictPopulate: false
          },
          {
            path: "mobile",
            select: "alt defaultAlt url",
            strictPopulate: false
          }
        ]
      },
      {
        path: "services",
        populate: [
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          }
        ]
      }
    ]);

    // update isCompleted
    if (subPage) {
      const {
        page,
        name,
        slug,
        heading,
        openIn,
        seoSchema,
        metaTitle,
        metaTags,
        metaDescription,
        services
      } = subPage;

      if (
        page &&
        name &&
        slug &&
        heading &&
        openIn &&
        seoSchema &&
        // faqs.length &&
        metaTitle &&
        metaTags &&
        metaDescription &&
        services.length
      ) {
        subPage = await SubPages.findOneAndUpdate(
          {
            _id: subPageId,
            isDeleted: false
          },
          { isCompleted: true },
          {
            new: true
          }
        ).populate([
          {
            path: "quickLinks",
            populate: {
              path: "image",
              select: "alt defaultAlt url",
              strictPopulate: false
            }
          },
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
            path: "services",
            populate: [
              {
                path: "media.primary",
                select: "alt defaultAlt url"
              }
            ]
          }
        ]);
      }
    }

    return subPage;
  } catch (error) {
    console.error(
      "Error updating Sub Page:",
      error
    );

    return null;
  }
};

export const restoreSubPage = async (
  pageId: string
): Promise<SubPageDocument | null> => {
  try {
    await connectDB();

    const page = await SubPages.findOneAndUpdate(
      {
        _id: pageId,
        isDeleted: true
      },
      {
        isActive: false,
        isDeleted: false
      },
      {
        new: true
      }
    );

    return page;
  } catch (error) {
    console.error(
      "Error Restoring Sub Page:",
      error
    );

    return null;
  }
};

export const softDeleteSubPage = async (
  subPageId: string
): Promise<SubPageDocument | null> => {
  try {
    await connectDB();

    const subPage =
      await SubPages.findOneAndUpdate(
        {
          _id: subPageId,
          isDeleted: false
        },
        {
          isActive: false,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return subPage;
  } catch (error) {
    console.error(
      "Error Soft Deleting Sub Page:",
      error
    );

    return null;
  }
};

export const hardDeleteSubPage = async (
  subPageId: string
): Promise<SubPageDocument | null> => {
  try {
    await connectDB();

    const subPage =
      await SubPages.findOneAndDelete(
        {
          _id: subPageId,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return subPage;
  } catch (error) {
    console.error(
      "Error Hard Deleting Sub Page:",
      error
    );

    return null;
  }
};

export const getSubPageOptions =
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
      const subPages =
        await SubPages.find(query).sort(sort);

      return subPages.map(({ _id, name }) => ({
        label: name,
        value: _id
      }));
    } catch (error) {
      console.error(
        "Error getting Sub Page Options:",
        error
      );

      return null;
    }
  };
