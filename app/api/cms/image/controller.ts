// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Images: Image } = MODELS;

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ImageQueryParamsType } from "@/app/api/cms/image/route";
type AddImageResultType = {
  name: string;
  status: "success" | "error";
};

// route specific
import imageOperations from "@/app/api/cms/image/routeSpecific/imageOperations";

export const getImages = async (
  queryParams: ImageQueryParamsType
): Promise<{
  count: number;
  data: ImageDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      folderId,
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

    if (folderId) {
      query.folderId = folderId;
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
      await Image.find(query).countDocuments();
    const images = await Image.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return { count: count, data: images };
  } catch (error) {
    console.error("Error getting images:", error);

    return null;
  }
};

export const getImage = async (
  imageId: string
): Promise<ImageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const image = await Image.findOne({
      _id: imageId,
      isDeleted: false
    });

    return image;
  } catch (error: any) {
    console.error("Error getting image:", error);

    return null;
  }
};

export async function addImages(
  addData: ImageDocument[]
): Promise<AddImageResultType[]> {
  const results: AddImageResultType[] = [];

  for (let imageData of addData) {
    try {
      imageData.name = `${Date.now()}.${imageData.extension}`;

      const url = (await imageOperations({
        folderName: imageData.folderName,
        imageName: imageData.name,
        variant: "add",
        data: imageData.data as string,
        extension: imageData.extension
      })) as string;

      if (url) {
        imageData.url = url;

        // DB insert
        const newImage = new Image(imageData);

        const image = await newImage.save();

        if (image) {
          results.push({
            name: imageData.name,
            status: "success"
          });
        } else {
          const deleted = await imageOperations({
            folderName: imageData.folderName,
            imageName: imageData.name,
            variant: "delete"
          });

          if (!deleted) {
            console.error(
              "Error deleting image:",
              imageData.name
            );
          }

          results.push({
            name: imageData.name,
            status: "error"
          });
        }
      } else {
        results.push({
          name: imageData.name,
          status: "error"
        });
      }
    } catch (error: any) {
      console.error("Error adding image:", error);

      results.push({
        name: imageData.name,
        status: "error"
      });
    }
  }

  return results;
}

export const updateImage = async (
  imageId: string,
  updateData: Partial<ImageDocument>
): Promise<ImageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const folder = await Image.findOneAndUpdate(
      { _id: imageId, isDeleted: false },
      updateData,
      {
        new: true
      }
    );

    return folder;
  } catch (error) {
    console.error("Error updating Image:", error);

    return null;
  }
};

export const deleteImage = async (
  imageId: string
): Promise<ImageDocument | null> => {
  try {
    await connectDB();

    const folder = await Image.findOneAndUpdate(
      { _id: imageId, isDeleted: false },
      { isDeleted: true },
      {
        new: true
      }
    );

    return folder;
  } catch (error) {
    console.error("Error deleting image:", error);

    return null;
  }
};
