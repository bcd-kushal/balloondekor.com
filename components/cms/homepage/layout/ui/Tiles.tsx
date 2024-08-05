//libraries
import Image from "next/image";
import Link from "next/link";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import { ImageDocument } from "@/schemas/cms/image";

//styles
import styles from "@/components/cms/homepage/layout/ui/tiles.module.css";

export default function Tiles({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  return (
    <div className={styles.container}>
      {layout.heading || layout.subHeading ? (
        <div className={styles.header}>
          {layout.heading ? (
            <h3 className={styles.heading}>
              {layout.heading}
            </h3>
          ) : (
            <></>
          )}
          {layout.subHeading ? (
            <h4 className={styles.subHeading}>
              {layout.subHeading}
            </h4>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.sections}>
        <div className={styles.sectionLeft}>
          <div
            className={styles.linkImagesContainer}
          >
            <div className={styles.linkImages}>
              {layout.sections[0].linkImages.map(
                ({ _id, label, url, image }) => (
                  <Link
                    key={_id}
                    className={styles.linkImage}
                    href={url}
                  >
                    <div
                      className={styles.backdrop}
                    ></div>
                    <div
                      className={
                        styles.imageContainer
                      }
                    >
                      <Image
                        className={styles.image}
                        src={
                          (image as ImageDocument)
                            .url
                        }
                        alt={
                          (image as ImageDocument)
                            .alt ||
                          (image as ImageDocument)
                            .defaultAlt
                        }
                        width={300}
                        height={200}
                        quality={60}
                        priority={false}
                        placeholder="blur"
                        blurDataURL={
                          (image as ImageDocument)
                            .url || ""
                        }
                      />
                    </div>
                    <span
                      className={styles.label}
                    >
                      {label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className={styles.sectionRight}>
          <div
            className={styles.linkImagesContainer}
          >
            <div className={styles.linkImages}>
              {layout.sections[1].linkImages.map(
                ({ _id, label, url, image }) => (
                  <Link
                    key={_id}
                    className={styles.linkImage}
                    href={url}
                  >
                    <div
                      className={styles.backdrop}
                    ></div>
                    <div
                      className={
                        styles.imageContainer
                      }
                    >
                      <Image
                        className={styles.image}
                        src={
                          (image as ImageDocument)
                            .url
                        }
                        alt={
                          (image as ImageDocument)
                            .alt ||
                          (image as ImageDocument)
                            .defaultAlt
                        }
                        width={500}
                        height={400}
                        quality={60}
                        priority={false}
                        placeholder="blur"
                        blurDataURL={
                          (image as ImageDocument)
                            .url || ""
                        }
                      />
                    </div>
                    <span
                      className={styles.label}
                    >
                      {label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
