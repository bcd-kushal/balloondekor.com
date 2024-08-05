// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Brands } = MODELS;

// types
import { BrandDocument } from "@/schemas/cms/brand";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getBrands = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: BrandDocument[];
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
      await Brands.find(query).countDocuments();
    const brands = await Brands.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: brands
    };
  } catch (error) {
    console.error("Error getting Brands:", error);

    return null;
  }
};

export const getBrand = async (
  brandId: string
): Promise<BrandDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const brand = await Brands.findOne({
      _id: brandId,
      isDeleted: false
    });

    return brand;
  } catch (error: any) {
    console.error("Error getting Brand:", error);

    return null;
  }
};

export const addBrand = async (
  addData: BrandDocument
): Promise<BrandDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newBrand = new Brands(addData);

    const brand = await newBrand.save();

    return brand;
  } catch (error) {
    console.error("Error Adding Brand:", error);

    return null;
  }
};

export const updateBrand = async (
  brandId: string,
  updateData: Partial<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const brand = await Brands.findOneAndUpdate(
      {
        _id: brandId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return brand;
  } catch (error) {
    console.error("Error updating Brand:", error);

    return null;
  }
};

export const deleteBrand = async (
  brandId: string
): Promise<BrandDocument | null> => {
  try {
    await connectDB();

    const brand = await Brands.findOneAndUpdate(
      {
        _id: brandId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return brand;
  } catch (error) {
    console.error("Error Deleting Brand:", error);

    return null;
  }
};

export const getBrandOptions = async (): Promise<
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
    const brands =
      await Brands.find(query).sort(sort);

    return brands.map(({ _id, name }) => ({
      label: name,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting Brand Options:",
      error
    );

    return null;
  }
};
