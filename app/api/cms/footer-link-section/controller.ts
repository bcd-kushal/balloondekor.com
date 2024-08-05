// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { FooterLinkSections: FooterLinkSection } =
  MODELS;

// types
import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";
import { QueryParamsType } from "@/types/cms/api";

export const getFooterLinkSections = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: FooterLinkSectionDocument[];
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
      await FooterLinkSection.find(
        query
      ).countDocuments();
    const footerLinkSections =
      await FooterLinkSection.find(query)
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
      data: footerLinkSections
    };
  } catch (error) {
    console.error(
      "Error getting Footer Link Sections:",
      error
    );

    return null;
  }
};

export const getFooterLinkSection = async (
  footerLinkSectionId: string
): Promise<FooterLinkSectionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const footerLinkSection =
      await FooterLinkSection.findOne({
        _id: footerLinkSectionId,
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

    return footerLinkSection;
  } catch (error: any) {
    console.error(
      "Error getting Footer Link Section:",
      error
    );

    return null;
  }
};

export const addFooterLinkSection = async (
  addData: FooterLinkSectionDocument
): Promise<FooterLinkSectionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newFooterLinkSection =
      new FooterLinkSection(addData);

    const footerLinkSection =
      await newFooterLinkSection.save();

    return footerLinkSection;
  } catch (error) {
    console.error(
      "Error Adding Footer Link Section:",
      error
    );

    return null;
  }
};

export const updateFooterLinkSection = async (
  footerLinkSectionId: string,
  updateData: Partial<FooterLinkSectionDocument>
): Promise<FooterLinkSectionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const navLink =
      await FooterLinkSection.findOneAndUpdate(
        {
          _id: footerLinkSectionId,
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
      "Error updating Footer Link Section:",
      error
    );

    return null;
  }
};

export const reorderFooterLinkSections = async (
  footerLinkSection1Id: string,
  footerLinkSection2Id: string
): Promise<FooterLinkSectionDocument[]> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const [
      footerLinkSection1,
      footerLinkSection2
    ] = await Promise.all([
      FooterLinkSection.findById(
        footerLinkSection1Id
      ),
      FooterLinkSection.findById(
        footerLinkSection2Id
      )
    ]);

    if (
      !footerLinkSection1 ||
      !footerLinkSection2
    ) {
      return [];
    }

    // reorder
    const tempOrder1 = footerLinkSection1.order;
    const tempOrder2 = footerLinkSection2.order;

    [
      footerLinkSection1.order,
      footerLinkSection2.order
    ] = [999999998, 999999999];

    // DB update
    await Promise.all([
      footerLinkSection1.save(),
      footerLinkSection2.save()
    ]);

    [
      footerLinkSection1.order,
      footerLinkSection2.order
    ] = [tempOrder2, tempOrder1];

    const updatedFooterLinkSections =
      await Promise.all([
        footerLinkSection1.save(),
        footerLinkSection2.save()
      ]);

    return updatedFooterLinkSections;
  } catch (error) {
    console.error(
      "Error reordering Footer Link Sections:",
      error
    );

    return [];
  }
};

export const deleteFooterLinkSection = async (
  footerLinkSectionId: string
): Promise<FooterLinkSectionDocument | null> => {
  try {
    await connectDB();

    const footerLinkSection =
      await FooterLinkSection.findOneAndUpdate(
        {
          _id: footerLinkSectionId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return footerLinkSection;
  } catch (error) {
    console.error(
      "Error Deleting Footer Link Section:",
      error
    );

    return null;
  }
};
