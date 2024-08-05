import Image from "next/image";

import { useImageManagementContext } from "@/hooks/useImageManagementContext";

import { ImageDocument } from "@/schemas/cms/image";

import styles from "./image.module.css";

type Props = {
  image: ImageDocument;
  multiple?: boolean;
};

export default function ImageComp({
  image,
  multiple
}: Props) {
  const { _id, alt, url } = image;

  const {
    image: { active, selected }
  } = useImageManagementContext();

  const handleActive = () => {
    if (_id === active.val?._id) {
      active.set("");
    } else {
      active.set(_id);
    }
  };

  const handleSelect = () => {
    if (multiple) {
      const updatedSelectedImages: ImageDocument[] =
        selected.val.find(
          (selectedImage) =>
            selectedImage._id === _id
        )
          ? selected.val.filter(
              (selectedImage) =>
                selectedImage._id !== _id
            )
          : [...selected.val, image];

      selected.set(updatedSelectedImages);
    } else {
      if (
        selected.val.find(
          (selectedImage) =>
            selectedImage._id === _id
        )
      ) {
        selected.set([]);
      } else {
        selected.set([image]);
      }
    }
  };

  return (
    <div
      key={_id}
      className={`aspect-square relative`}
    >
      <div
        className={`${styles.indicator} cursor-pointer ${alt ? styles.updated : ""}`}
        onClick={handleActive}
      ></div>
      <Image
        className={`${styles.image} bg-slate-100 shadow-md cursor-pointer ${_id === active.val?._id ? styles.active : ""} ${selected.val.find((selectedImage) => selectedImage._id === _id) ? styles.selected : ""}`}
        src={url}
        alt="elem + image"
        height={200}
        width={200}
        quality={10}
        onClick={handleSelect}
      />
    </div>
  );
}
