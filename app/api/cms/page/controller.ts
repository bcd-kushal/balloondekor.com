// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Pages } = MODELS;

// types
import { PageOptionType } from "@/types/cms/form";
import { PageDocument } from "@/schemas/cms/page";
import { QueryParamsType } from "@/types/cms/api";

export const getPages = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: PageDocument[];
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
      if (filterBy.toLowerCase() === "category") {
        if (
          keyword &&
          keyword.toLowerCase() !== "all"
        ) {
          query.category = keyword;
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
      await Pages.find(query).countDocuments();
    const pages = await Pages.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(
        populate
          ? [
              {
                path: "category",
                select: "name slug"
              }
            ]
          : []
      );

    return {
      count: count,
      data: pages
    };
  } catch (error) {
    console.error("Error getting Pages:", error);

    return null;
  }
};

export const getPage = async (
  pageId: string
): Promise<PageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const page = await Pages.findOne({
      _id: pageId,
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

    return page;
  } catch (error: any) {
    console.error("Error getting Page:", error);

    return null;
  }
};

export const addPage = async (
  addData: PageDocument
): Promise<{
  ok: boolean;
  data: PageDocument | null;
  statusCode: number;
  message: string;
}> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const existingPage = await Pages.findOne({
      category: addData.category,
      slug: addData.slug
    });

    if (existingPage) {
      return {
        ok: false,
        data: null,
        statusCode: 409,
        message:
          "Page Name Already Exists For This Category"
      };
    }

    const newPage = new Pages(addData);

    const page = await newPage.save();

    return {
      ok: true,
      data: page,
      statusCode: 201,
      message: ""
    };
  } catch (error) {
    console.error("Error Adding Page:", error);

    return {
      ok: false,
      data: null,
      statusCode: 500,
      message: "Server Error"
    };
  }
};

export const updatePage = async (
  pageId: string,
  updateData: Partial<PageDocument>
): Promise<PageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let page = await Pages.findOneAndUpdate(
      {
        _id: pageId,
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

    // update isCompleted
    if (page) {
      const {
        category,
        name,
        slug,
        heading,
        openIn,
        seoSchema,
        metaTitle,
        metaTags,
        metaDescription,
        services
      } = page;

      if (
        category &&
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
        page = await Pages.findOneAndUpdate(
          {
            _id: pageId,
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

    return page;
  } catch (error) {
    console.error("Error updating Page:", error);

    return null;
  }
};

export const restorePage = async (
  pageId: string
): Promise<PageDocument | null> => {
  try {
    await connectDB();

    const page = await Pages.findOneAndUpdate(
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
    console.error("Error Restoring Page:", error);

    return null;
  }
};

export const softDeletePage = async (
  pageId: string
): Promise<PageDocument | null> => {
  try {
    await connectDB();

    const page = await Pages.findOneAndUpdate(
      {
        _id: pageId,
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

    return page;
  } catch (error) {
    console.error(
      "Error Soft Deleting Page:",
      error
    );

    return null;
  }
};

export const hardDeletePage = async (
  pageId: string
): Promise<PageDocument | null> => {
  try {
    await connectDB();

    const page = await Pages.findOneAndDelete(
      {
        _id: pageId,
        isDeleted: true
      },
      {
        new: true
      }
    );

    return page;
  } catch (error) {
    console.error(
      "Error Hard Deleting Page:",
      error
    );

    return null;
  }
};

export const getPageOptions = async (
  includeCategory: boolean
): Promise<PageOptionType[] | null> => {
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
    const pages =
      await Pages.find(query).sort(sort);

    return pages.map(
      ({ _id, category, name }) => ({
        category: includeCategory
          ? (category as string)
          : undefined,
        label: name,
        value: _id
      })
    );
  } catch (error) {
    console.error(
      "Error getting Page Options:",
      error
    );

    return null;
  }
};

export const getPageCategory = async (
  pageId: string
): Promise<string | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const page = await Pages.findById(pageId)
      .select(["category"])
      .populate([
        {
          path: "category",
          select: ["_id"]
        }
      ]);

    return (page as PageDocument)
      .category as string;
  } catch (error) {
    console.error(
      "Error getting Page Options:",
      error
    );

    return null;
  }
};
