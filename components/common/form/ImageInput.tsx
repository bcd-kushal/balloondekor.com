/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import NextImage from "next/image";

import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "./imageInput.module.css";
import {
  AddImgSVG,
  BinSVG,
  CrossSVG,
  NoImageSVG
} from "@/constants/svgs/svg";

// component
export default function ImageInput({
  title,
  name,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  resetValue,
  setValue
}: {
  title: string;
  name: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue: string;
  resetValue?: boolean;
  setValue: (value: ImageDocument[]) => void;
}) {
  // states
  const [previews, setPreviews] = useState<
    File[]
  >([]);
  const [images, setImages] = useState<
    ImageDocument[]
  >([]);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setPreviews([]);
      setImages([]);
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(images);
  }, [images]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    const previews: File[] = [];
    const images: ImageDocument[] = [];

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i] as File;

        if (file.size <= 10 * 1024 * 1024) {
          const fileData =
            await getFileData(file);

          const image = await getImage(fileData);

          if (image) {
            const imageData: Partial<ImageDocument> =
              {
                name: file.name,
                extension:
                  file.type.split("/")[1],
                defaultAlt: file.name
                  .split(".")[0]
                  .replace(/[^A-Za-z0-9\s]/g, "")
                  .replace(/\s+/g, " "),
                width: image.width,
                height: image.height,
                size: file.size,
                data: fileData.split(",")[1]
              };

            previews.push(file);
            images.push(
              imageData as ImageDocument
            );
          }
        }
      }

      setPreviews((prevPreviews) => [
        ...prevPreviews,
        ...previews
      ]);
      setImages((prevImages) => [
        ...prevImages,
        ...images
      ]);
    }
  };

  const handleRemove = (imageName: string) => {
    setPreviews((prevPreviews) =>
      prevPreviews.filter(
        ({ name }) => name !== imageName
      )
    );
    setImages((prevImages) =>
      prevImages.filter(
        ({ name }) => name !== imageName
      )
    );
  };

  const getFileData = async (
    file: File
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target?.result;

        if (typeof fileData === "string") {
          resolve(fileData);
          // resolve(image.split(",")[1]);
        } else {
          reject(
            new Error("Failed to read image")
          );
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const getImage = async (
    fileData: string
  ): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        if (image) {
          resolve(image);
        } else {
          reject(
            new Error("Failed to read image")
          );
        }
      };

      image.src = fileData;
    });
  };

  return (
    <fieldset
      className={` relative px-[20px] py-[12px] mt-[28px]`}
    >
      {title ? (
        <legend
          className={`font-medium text-[18px] capitalize`}
        >
          <span>{title}</span>
          {isRequired && (
            <span
              className={`text-red-300 ml-[4px]`}
            >
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <div>
        {/* add images button ------------------------------- */}
        <label
          className={` bg-[#12121215] border-[1px] border-[#12121215] text-[#121212] flex items-center gap-[8px] rounded-lg py-[8px] px-[16px] absolute right-[20px] -top-[32px] cursor-pointer transition-colors duration-300 hover:bg-[#12121235]`}
          htmlFor={name}
        >
          <AddImgSVG stroke="#121212" />{" "}
          <span>New image</span>
        </label>

        {/* added image preview section --------------------- */}
        <div
          className={`bg-transparent mt-[12px] ${!showError && hasChanged ? "rounded-xl border-[3px] border-[#12121230] border-dashed" : ""} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""} `}
        >
          <div
            className={`my-[12px] px-[12px] ${styles.scrollContainer}`}
          >
            <div className={`${styles.previews}`}>
              {previews.length ? (
                previews.map((file, i) => (
                  <div
                    key={i}
                    className={`group shadow-sm transition-all duration-300 hover:shadow-lg border-[1.5px] cursor-pointer ${
                      styles.previewContainer
                    } ${showError ? "" : "border-[#00aa0080]"}`}
                  >
                    {/* image remove red btn ------------------------------ */}
                    <span
                      className="group-hover:opacity-100 absolute right-[-11px] top-[-11px] rounded-full opacity-0 flex items-center justify-center p-[4px] bg-red-500 transition-all duration-100"
                      onClick={() =>
                        handleRemove(file.name)
                      }
                    >
                      <BinSVG
                        dimensions={14}
                        stroke="#fff"
                      />
                    </span>
                    <NextImage
                      className={styles.preview}
                      src={URL.createObjectURL(
                        file
                      )}
                      alt={"Uploaded Image"}
                      width={100}
                      height={100}
                    />
                  </div>
                ))
              ) : (
                <span
                  className={`w-full min-h-[200px] flex flex-col items-center justify-center gap-[8px] border-[3px]  border-dashed ${hasChanged ? (showError ? "rounded-xl bg-[rgb(244,240,240)] border-[#c7727250]" : "border-[#12121250]") : "rounded-xl bg-[#1f1f1f09] border-[#12121250]"}`}
                >
                  <NoImageSVG
                    dimensions={32}
                    stroke={
                      hasChanged && showError
                        ? "rgb(248,113,113)"
                        : "#2229"
                    }
                  />
                  <span
                    className={`text-[14px] ${hasChanged && showError ? "text-red-400" : "text-[#2229]"}`}
                  >
                    {hasChanged && showError
                      ? "Atleast one image required"
                      : "No image added... yet"}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={`hidden`}>
          <input
            type="file"
            name={name}
            id={name}
            accept="image/jpeg, image/jpg, image/png, image/gif, image/webp, image/avif"
            multiple
            onChange={handleChange}
          />
        </div>
      </div>
      {/* {errorMessage ? (
        <p className={styles.errorMessage}>
          {hasSubmitted || hasChanged ? (
            <NextImage
              className={styles.errorMessageIcon}
              src={`/icons/${showError ? "error" : "success"}-icon.svg`}
              alt={"Validation Icon"}
              width={12}
              height={12}
              unoptimized
            />
          ) : (
            <></>
          )}
          <span
            className={styles.errorMessageText}
          >
            {(hasSubmitted || hasChanged) &&
            showError
              ? errorMessage
              : ""}
          </span>
        </p>
      ) : (
        <></>
      )} */}
    </fieldset>
  );
}
