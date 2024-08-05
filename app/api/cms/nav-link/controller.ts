// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { NavLinks: NavLink } = MODELS;

// types
import { NavLinkDocument } from "@/schemas/cms/navLink";
import { QueryParamsType } from "@/types/cms/api";

export const getNavLinks = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: NavLinkDocument[];
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
      await NavLink.find(query).countDocuments();
    const navLinks = await NavLink.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);
    // .populate(
    //   populate
    //     ? {
    //         path: "sections",
    //         populate: {
    //           path: "linkImages",
    //           populate: {
    //             path: "image"
    //           }
    //         }
    //       }
    //     : { path: "" }
    // );

    return {
      count: count,
      data: navLinks
    };
  } catch (error) {
    console.error(
      "Error getting Nav Links:",
      error
    );

    return null;
  }
};

export const getNavLink = async (
  navLinkId: string
): Promise<NavLinkDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const navLink = await NavLink.findOne({
      _id: navLinkId,
      isDeleted: false
    });
    //   .populate({
    //   path: "sections",
    //   populate: {
    //     path: "linkImages",
    //     populate: {
    //       path: "image"
    //     }
    //   }
    // });

    return navLink;
  } catch (error: any) {
    console.error(
      "Error getting Nav Link:",
      error
    );

    return null;
  }
};

export const addNavLink = async (
  addData: NavLinkDocument
): Promise<NavLinkDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newNavLink = new NavLink(addData);

    const navLink = await newNavLink.save();

    return navLink;
  } catch (error) {
    console.error(
      "Error Adding Nav Link:",
      error
    );

    return null;
  }
};

export const updateNavLink = async (
  navLinkId: string,
  updateData: Partial<NavLinkDocument>
): Promise<NavLinkDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const navLink =
      await NavLink.findOneAndUpdate(
        {
          _id: navLinkId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );
    //   .populate({
    //   path: "sections",
    //   populate: {
    //     path: "linkImages",
    //     populate: {
    //       path: "image"
    //     }
    //   }
    // });

    return navLink;
  } catch (error) {
    console.error(
      "Error updating Nav Link:",
      error
    );

    return null;
  }
};

export const reorderNavLinks = async (
  navLink1Id: string,
  navLink2Id: string
): Promise<NavLinkDocument[]> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const [navLink1, navLink2] =
      await Promise.all([
        NavLink.findById(navLink1Id),
        NavLink.findById(navLink2Id)
      ]);

    if (!navLink1 || !navLink2) {
      return [];
    }

    // reorder
    const tempOrder1 = navLink1.order;
    const tempOrder2 = navLink2.order;

    [navLink1.order, navLink2.order] = [
      999999998, 999999999
    ];

    // DB update
    await Promise.all([
      navLink1.save(),
      navLink2.save()
    ]);

    [navLink1.order, navLink2.order] = [
      tempOrder2,
      tempOrder1
    ];

    const updatedNavLinks = await Promise.all([
      navLink1.save(),
      navLink2.save()
    ]);

    return updatedNavLinks;
  } catch (error) {
    console.error(
      "Error reordering Nav Links:",
      error
    );

    return [];
  }
};

export const deleteNavLink = async (
  navLinkId: string
): Promise<NavLinkDocument | null> => {
  try {
    await connectDB();

    const navLink =
      await NavLink.findOneAndUpdate(
        {
          _id: navLinkId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return navLink;
  } catch (error) {
    console.error(
      "Error Deleting Nav Link:",
      error
    );

    return null;
  }
};
