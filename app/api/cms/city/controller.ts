// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Cities, States } = MODELS;

// types
import { CityDocument } from "@/schemas/cms/city";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getCities = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CityDocument[];
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
      if (filterBy === "state") {
        if (keyword) {
          const states = await States.find({
            name: {
              $regex: new RegExp(keyword, "i")
            }
          });

          if (states.length) {
            query[filterBy] = states[0]._id;
          }
        }
      } else {
        query[filterBy] =
          filterBy === "isActive" || "isTopCity"
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
      await Cities.find(query).countDocuments();
    const cities = await Cities.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate({
        ...(populate
          ? { path: "state" }
          : {
              path: "",
              strictPopulate: false
            })
      })
      .populate({
        ...(populate
          ? {
              path: "icon",
              strictPopulate: false
            }
          : {
              path: "",
              strictPopulate: false
            })
      });

    return {
      count: count,
      data: cities
    };
  } catch (error) {
    console.error("Error getting Cities:", error);

    return null;
  }
};

export const getCity = async (
  cityId: string
): Promise<CityDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const city = await Cities.findOne({
      _id: cityId,
      isDeleted: false
    })
      .populate({ path: "state" })
      .populate({ path: "icon" });

    return city;
  } catch (error: any) {
    console.error("Error getting City:", error);

    return null;
  }
};

export const addCity = async (
  addData: CityDocument
): Promise<CityDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCity = new Cities(addData);

    const city = await newCity.save();

    const populatedCity = await Cities.findById(
      city._id
    )
      .populate({ path: "state" })
      .populate({ path: "icon" });

    return populatedCity;
  } catch (error) {
    console.error("Error Adding City:", error);

    return null;
  }
};

export const updateCity = async (
  cityId: string,
  updateData: Partial<CityDocument>
): Promise<CityDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const city = await Cities.findOneAndUpdate(
      {
        _id: cityId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    )
      .populate({ path: "state" })
      .populate({ path: "icon" });

    return city;
  } catch (error) {
    console.error("Error updating City:", error);

    return null;
  }
};

export const deleteCity = async (
  cityId: string
): Promise<CityDocument | null> => {
  try {
    await connectDB();

    const city = await Cities.findOneAndUpdate(
      {
        _id: cityId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    )
      .populate({ path: "state" })
      .populate({ path: "icon" });

    return city;
  } catch (error) {
    console.error("Error Deleting City:", error);

    return null;
  }
};

export const getCityOptions = async (): Promise<
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
    const cities =
      await Cities.find(query).sort(sort);

    return cities.map(({ _id, name }) => ({
      label: name,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting City Options:",
      error
    );

    return null;
  }
};
