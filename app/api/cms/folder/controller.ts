// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Folders: Folder } = MODELS;

// types
import { FolderDocument } from "@/schemas/cms/folder";

// route specific
import folderOperations from "@/app/api/cms/folder/routeSpecific/folderOperations";

// controllers
export const getFolders = async (): Promise<
  FolderDocument[] | null
> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const folders = await Folder.find({
      isDeleted: false
    }).sort({
      label: 1
    });

    return folders;
  } catch (error: any) {
    console.error(
      "Error getting folders:",
      error
    );

    return null;
  }
};

export const getFolder = async (
  folderId: string
): Promise<FolderDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const folder = await Folder.findOne({
      _id: folderId,
      isDeleted: false
    });

    return folder;
  } catch (error: any) {
    console.error("Error getting folder:", error);

    return null;
  }
};

export const addFolder = async (
  addData: FolderDocument
): Promise<FolderDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // set name as current time
    addData.name = Date.now().toString();

    // storage operations
    const added = await folderOperations({
      name: addData.name,
      variant: "add"
    });

    // storage error
    if (!added) {
      return null;
    }

    // DB insert
    const newFolder = new Folder(addData);

    const folder = await newFolder.save();

    return folder;
  } catch (error) {
    console.error(
      "Error creating folder:",
      error
    );

    return null;
  }
};

export const updateFolder = async (
  folderId: string,
  updateData: Partial<FolderDocument>
): Promise<FolderDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const folder = await Folder.findOneAndUpdate(
      { _id: folderId, isDeleted: false },
      updateData,
      {
        new: true
      }
    );

    return folder;
  } catch (error) {
    console.error(
      "Error updating folder:",
      error
    );

    return null;
  }
};

export const deleteFolder = async (
  folderId: string
): Promise<FolderDocument | null> => {
  try {
    await connectDB();

    const folder = await Folder.findOneAndUpdate(
      { _id: folderId, isDeleted: false },
      { isDeleted: true },
      {
        new: true
      }
    );

    return folder;
  } catch (error) {
    console.error(
      "Error deleting folder:",
      error
    );

    return null;
  }
};
