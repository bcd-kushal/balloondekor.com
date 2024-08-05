// libraries
import Image from "next/image";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "@/components/ui/service/gallery/thumbnails/thumbnail.module.css";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

export default function Thumbnail(
  props: {
    image: ImageDocument;
    isActive: boolean;
    onClick?: () => void;
    onHover?: () => void;
  } & (
    | { hasMore?: undefined }
    | {
        hasMore: boolean;
        hasMoreLabel?: string;
        hasMoreData:
          | {
              images: ImageDocument[];
              activeImageIndex: number;
              onChangeIndex: (
                index: number
              ) => void;
            }
          | undefined;
      }
  )
) {
  const {
    image: { alt, defaultAlt, url },
    isActive,
    hasMore,
    onClick,
    onHover
  } = props;

  return (
    <>
      {!hasMore ? (
        <div
          className={
            isActive
              ? styles.active
              : styles.container
          }
          onClick={onClick}
          onMouseEnter={onHover}
        >
          <Image
            className={`
          ${styles.image}
          ${hasMore ? styles.more : ""}
        `}
            src={url}
            alt={alt || defaultAlt}
            layout="fill"
            quality={60}
            priority={isActive}
            placeholder="blur"
            blurDataURL={url || ""}
          />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <div
              className={
                isActive
                  ? styles.active
                  : styles.container
              }
              onClick={() => {}}
              onMouseEnter={onHover}
            >
              <Image
                className={`
          ${styles.image}
          ${hasMore ? styles.more : ""}
        `}
                src={url}
                alt={alt || defaultAlt}
                layout="fill"
                quality={60}
                priority={isActive}
                placeholder="blur"
                blurDataURL={url || ""}
              />
              {hasMore && (
                <div
                  className={
                    styles.labelContainer
                  }
                >
                  <span className={styles.label}>
                    {props.hasMoreLabel ||
                      "view all"}
                  </span>
                </div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[720px] h-[600px] grid grid-cols-[120px_1fr] gap-7">
            <section className="h-full scrollbar-hide overflow-y-scroll flex items-start justify-start gap-6 flex-col *:rounded-2xl">
              {hasMore &&
                props.hasMoreData?.images.map(
                  (img, index) => (
                    <Image
                      src={img.url}
                      height={100}
                      width={100}
                      alt=""
                      key={index}
                      onClick={() =>
                        props.hasMoreData!.onChangeIndex(
                          index
                        )
                      }
                      className={`border-[2px] cursor-pointer transition-all duration-300 ${props.hasMoreData!.activeImageIndex === index ? "border-purple-900" : "border-transparent"}`}
                      quality={60}
                      priority={false}
                      placeholder="blur"
                      blurDataURL={img.url || ""}
                    />
                  )
                )}
            </section>
            <section className="select-none -translate-x-8 aspect-square bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center object-cover h-full *:w-auto *:h-full">
              <Image
                src={
                  props.hasMoreData!.images[
                    props.hasMoreData!
                      .activeImageIndex
                  ].url
                }
                height={100}
                width={100}
                alt=""
                quality={60}
                priority={false}
                placeholder="blur"
                blurDataURL={
                  props.hasMoreData!.images[
                    props.hasMoreData!
                      .activeImageIndex
                  ].url
                }
              />
            </section>
          </DialogContent>
        </Dialog>
      )}{" "}
    </>
  );
}
