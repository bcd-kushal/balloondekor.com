// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";

const { Products, ServiceCategories } = MODELS;

// types
import { ProductDocument } from "@/schemas/cms/product";
import { QueryParamsType } from "@/types/cms/api";

export const getProducts = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ProductDocument[];
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

    // if (keyword) {
    //   if (filterBy) {
    //     query[filterBy] = {
    //       $regex: new RegExp(keyword, "i")
    //     };
    //   } else {
    //     query.$text = { $search: keyword };
    //   }
    // }

    if (filterBy) {
      if (filterBy === "serviceCategoryId") {
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
          filterBy === "isActive" ||
          "isBestSellers"
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
      await Products.find(query).countDocuments();

    const products = await Products.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate({
        ...(populate
          ? {
              path: "primary",
              strictPopulate: false
            }
          : {
              path: "",
              strictPopulate: false
            })
      })
      .populate({
        ...(populate
          ? {
              path: "gallery",
              strictPopulate: false
            }
          : { path: "", strictPopulate: false })
      })
      .populate({
        ...(populate
          ? {
              path: "reviewImages",
              strictPopulate: false
            }
          : { path: "", strictPopulate: false })
      });

    return {
      count: count,
      data: products
    };
  } catch (error) {
    console.error(
      "Error getting Products:",
      error
    );

    return null;
  }
};

export const getProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const product = await Products.findOne({
      _id: productId,
      isDeleted: false
    })
      .populate({ path: "primary" })
      .populate({ path: "gallery" })
      .populate({ path: "reviewImages" });
    return product;
  } catch (error: any) {
    console.error(
      "Error getting Product:",
      error
    );

    return null;
  }
};

export const addProduct = async (
  addData: ProductDocument
): Promise<ProductDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newProduct = new Products(addData);

    const product = await newProduct.save();

    const populatedProduct =
      await Products.findById(product._id)
        .populate({ path: "primary" })
        .populate({ path: "gallery" })
        .populate({ path: "reviewImages" });

    return populatedProduct;
  } catch (error) {
    console.error("Error Adding Product:", error);

    return null;
  }
};

export const updateProduct = async (
  productId: string,
  updateData: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let product = await Products.findOneAndUpdate(
      {
        _id: productId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    )
      .populate({ path: "aiTagKeyword" })
      .populate({ path: "primary" })
      .populate({ path: "gallery" })
      .populate({ path: "reviewImages" });

    return product;
  } catch (error) {
    console.error(
      "Error updating Product:",
      error
    );

    return null;
  }
};

export const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  try {
    await connectDB();

    const product =
      await Products.findOneAndUpdate(
        {
          _id: productId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return product;
  } catch (error) {
    console.error(
      "Error Deleting Product:",
      error
    );

    return null;
  }
};
