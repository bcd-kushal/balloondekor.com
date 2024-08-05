import {
  addImageToS3,
  deleteImageFromS3
} from "@/app/api/cms/s3";

// env
const region =
  process.env.BALLOONDEKOR_AWS_S3_REGION || "";
const bucketName =
  process.env.BALLOONDEKOR_AWS_S3_BUCKET_NAME ||
  "";

type CommonProps = {
  folderName: string;
  imageName: string;
};

type AddVariantProps = {
  variant: "add";
  data: string;
  extension: string;
};

type DeleteVariantProps = {
  variant: "delete";
};

type Props = CommonProps &
  (AddVariantProps | DeleteVariantProps);

const addImage = async (
  folderName: string,
  imageName: string,
  data: string,
  extension: string
): Promise<string> => {
  try {
    const buffer = Buffer.from(data, "base64");

    await addImageToS3(
      folderName,
      imageName,
      buffer,
      extension
    );

    return `https://${bucketName}.s3.${region}.amazonaws.com/${folderName}/${imageName}`;
  } catch (error: any) {
    console.error(error.message);

    return "";
  }
};

const deleteImage = async (
  folderName: string,
  imageName: string
): Promise<boolean> => {
  try {
    await deleteImageFromS3(
      folderName,
      imageName
    );

    return true;
  } catch (error: any) {
    console.error(error.message);

    return false;
  }
};

export default async function imageOperations(
  props: Props
): Promise<boolean | string> {
  const { folderName, imageName, variant } =
    props;

  if (variant === "add") {
    const { data, extension } = props;

    return await addImage(
      folderName,
      imageName,
      data,
      extension
    );
  } else if (variant === "delete") {
    return await deleteImage(
      folderName,
      imageName
    );
  } else {
    return false;
  }
}
