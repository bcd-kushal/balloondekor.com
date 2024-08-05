import {
  addFolderToS3,
  deleteFolderFromS3
} from "@/app/api/cms/s3";

type Props = {
  name: string;
  variant: "add" | "delete";
};

const addFolder = async (
  dirName: string
): Promise<boolean> => {
  try {
    await addFolderToS3(dirName);

    return true;
  } catch (error: any) {
    console.log(
      "Error adding folder to s3:",
      error.message
    );

    return false;
  }
};

const deleteFolder = async (
  dirName: string
): Promise<boolean> => {
  try {
    await deleteFolderFromS3(dirName);

    return true;
  } catch (error: any) {
    console.log(
      "Error deleting folder at s3:",
      error.message
    );

    return false;
  }
};

export default async function folderOperations(
  props: Props
): Promise<boolean> {
  const { name, variant } = props;

  if (variant === "add") {
    return await addFolder(name);
  } else if (variant === "delete") {
    return await deleteFolder(name);
  } else {
    return false;
  }
}
