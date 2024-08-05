// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
import { VenueDocument } from "@/schemas/services/venue";
import { QueryParamsType } from "@/types/cms/api";
const { Venues } = MODELS;

export async function getVenues(
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: VenueDocument[];
} | null> {
  try {
    await connectDB();

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

    if (filterBy) {
      query[filterBy] = {
        $regex: new RegExp(keyword || "", "i")
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
      sort.submittedAt =
        orderBy === "asc" ? 1 : -1;
    }

    const venues = await Venues.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    const totalVenues =
      await Venues.find(query).countDocuments();

    return { count: totalVenues, data: venues };
  } catch (error: any) {
    console.error(
      `[ERR] accessing venues from db:: ${error}`
    );
    return null;
  }
}

export async function getVenue(
  id: string
): Promise<VenueDocument | null> {
  try {
    await connectDB();

    const venue = await Venues.findOne({
      _id: id,
      isDeleted: false
    });

    return venue;
  } catch (error: any) {
    console.error(
      `[ERR] accessing venues from db:: ${error}`
    );
    return null;
  }
}

export async function addNewVenue(
  venue: VenueDocument
): Promise<VenueDocument | null> {
  try {
    await connectDB();

    const newVenue = new Venues(venue);
    const saveResponse = await newVenue.save();

    return saveResponse;
  } catch (error: any) {
    console.error(
      `[ERR] accessing venues from db:: ${error}`
    );
    return null;
  }
}

export async function updateVenue({
  id,
  newData
}: {
  id: string;
  newData: Partial<VenueDocument>;
}): Promise<VenueDocument | null> {
  try {
    await connectDB();

    const dbResponse =
      await Venues.findOneAndUpdate(
        {
          _id: id,
          isDeleted: false
        },
        newData,
        {
          new: true
        }
      );

    return dbResponse;
  } catch (error: any) {
    console.error(
      `[ERR] updating venue: ${error}`
    );

    return null;
  }
}

export async function deleteVenue(
  id: string
): Promise<VenueDocument | null> {
  try {
    await connectDB();

    const response =
      await Venues.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

    return response;
  } catch (error: any) {
    console.error(
      `[ERR] deleting venue: ${error}`
    );
    return null;
  }
}
