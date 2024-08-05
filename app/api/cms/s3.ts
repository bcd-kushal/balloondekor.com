import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";

// env
const region =
  process.env.BALLOONDEKOR_AWS_S3_REGION || "";
const accessKeyId =
  process.env.BALLOONDEKOR_AWS_S3_ACCESS_KEY_ID ||
  "";
const secretAccessKey =
  process.env
    .BALLOONDEKOR_AWS_S3_SECRET_ACCESS_KEY || "";
const bucketName =
  process.env.BALLOONDEKOR_AWS_S3_BUCKET_NAME ||
  "";

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export const addFolderToS3 = async (
  folderName: string
) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/`
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);
};

export const deleteFolderFromS3 = async (
  folderName: string
) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/`
  };

  const command = new DeleteObjectCommand(params);

  await s3Client.send(command);
};

export const addImageToS3 = async (
  folderName: string,
  imageName: string,
  buffer: Buffer,
  extension: string
) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${imageName}`,
    Body: buffer,
    ContentType: `image/${extension}`
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);
};

export const deleteImageFromS3 = async (
  folderName: string,
  imageName: string
) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${imageName}`
  };

  const command = new DeleteObjectCommand(params);

  await s3Client.send(command);
};
