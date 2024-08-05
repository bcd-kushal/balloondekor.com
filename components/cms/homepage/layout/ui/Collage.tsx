//libraries
import Image from "next/image";
import Link from "next/link";

// components
import Button from "@/components/common/Button";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import { ImageDocument } from "@/schemas/cms/image";

//styles
import styles from "@/components/cms/homepage/layout/ui/collage.module.css";
import { Suspense } from "react";

export default function Collage({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  const leftSection = layout.sections[0];
  const rightSection = layout.sections[1];

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
        {/* LEFT SECTION ================================================== */}
        <div className={styles.section}>
          {leftSection.heading ||
          leftSection.subHeading ||
          (leftSection.btn.label &&
            leftSection.btn.url) ? (
            <div className={styles.sectionHeader}>
              {leftSection.heading ||
              leftSection.subHeading ? (
                <div
                  className={
                    styles.sectionHeadingContainer
                  }
                >
                  {leftSection.heading ? (
                    <h3
                      className={
                        styles.sectionHeading
                      }
                    >
                      {leftSection.heading}
                    </h3>
                  ) : (
                    <></>
                  )}
                  {leftSection.subHeading ? (
                    <h4
                      className={
                        styles.sectionSubHeading
                      }
                    >
                      {leftSection.subHeading}
                    </h4>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {leftSection.btn.label &&
              leftSection.btn.url ? (
                <Button
                  className={styles.btn}
                  type="secondary"
                  label={leftSection.btn.label}
                  variant="link"
                  href={leftSection.btn.url}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <div
            className={styles.linkImagesContainer}
          >
            <div className={styles.linkImages}>
              <div className={styles.first}>
                {leftSection.linkImages
                  .slice(0, 2)
                  .map(
                    ({
                      _id,
                      label,
                      url,
                      image
                    }) => (
                      <Link
                        key={_id}
                        className={
                          styles.linkImage
                        }
                        href={url}
                      >
                        <div
                          className={
                            styles.backdrop
                          }
                        ></div>
                        <div
                          className={
                            styles.imageContainer
                          }
                        >
                          <Image
                            className={
                              styles.image
                            }
                            src={
                              (
                                image as ImageDocument
                              ).url || ""
                            }
                            alt={
                              (
                                image as ImageDocument
                              ).alt ||
                              (
                                image as ImageDocument
                              ).defaultAlt
                            }
                            height={100}
                            width={100}
                            quality={60}
                            priority={false}
                            placeholder="blur"
                            blurDataURL={
                              (
                                image as ImageDocument
                              ).url || ""
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
              <div className={styles.second}>
                {leftSection.linkImages
                  .slice(-2)
                  .map(
                    ({
                      _id,
                      label,
                      url,
                      image
                    }) => (
                      <Link
                        key={_id}
                        className={
                          styles.linkImage
                        }
                        href={url}
                      >
                        <div
                          className={
                            styles.backdrop
                          }
                        ></div>
                        <div
                          className={
                            styles.imageContainer
                          }
                        >
                          <Image
                            className={
                              styles.image
                            }
                            src={
                              (
                                image as ImageDocument
                              ).url || ""
                            }
                            alt={
                              (
                                image as ImageDocument
                              ).alt ||
                              (
                                image as ImageDocument
                              ).defaultAlt
                            }
                            height={100}
                            width={100}
                            quality={60}
                            priority={false}
                            placeholder="blur"
                            blurDataURL={
                              (
                                image as ImageDocument
                              ).url || ""
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
        {/* RIGHT SECTION ================================================== */}
        <div className={styles.section}>
          {rightSection.heading ||
          rightSection.subHeading ||
          (rightSection.btn.label &&
            rightSection.btn.url) ? (
            <div className={styles.sectionHeader}>
              {rightSection.heading ||
              rightSection.subHeading ? (
                <div
                  className={
                    styles.sectionHeadingContainer
                  }
                >
                  {rightSection.heading ? (
                    <h3
                      className={
                        styles.sectionHeading
                      }
                    >
                      {rightSection.heading}
                    </h3>
                  ) : (
                    <></>
                  )}
                  {rightSection.subHeading ? (
                    <h4
                      className={
                        styles.sectionSubHeading
                      }
                    >
                      {rightSection.subHeading}
                    </h4>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {rightSection.btn.label &&
              rightSection.btn.url ? (
                <Button
                  className={styles.btn}
                  type="secondary"
                  label={rightSection.btn.label}
                  variant="link"
                  href={rightSection.btn.url}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <div
            className={styles.linkImagesContainer}
          >
            <div className={styles.linkImages}>
              <div className={styles.first}>
                {rightSection.linkImages
                  .slice(0, 2)
                  .map(
                    ({
                      _id,
                      label,
                      url,
                      image
                    }) => (
                      <Link
                        key={_id}
                        className={
                          styles.linkImage
                        }
                        href={url}
                      >
                        <div
                          className={
                            styles.backdrop
                          }
                        ></div>
                        <div
                          className={
                            styles.imageContainer
                          }
                        >
                          <Image
                            className={
                              styles.image
                            }
                            src={
                              (
                                image as ImageDocument
                              ).url
                            }
                            alt={
                              (
                                image as ImageDocument
                              ).alt ||
                              (
                                image as ImageDocument
                              ).defaultAlt
                            }
                            height={100}
                            width={100}
                            unoptimized
                            priority={false}
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
              <div className={styles.second}>
                {rightSection.linkImages
                  .slice(-2)
                  .map(
                    ({
                      _id,
                      label,
                      url,
                      image
                    }) => (
                      <Link
                        key={_id}
                        className={
                          styles.linkImage
                        }
                        href={url}
                      >
                        <div
                          className={
                            styles.backdrop
                          }
                        ></div>
                        <div
                          className={
                            styles.imageContainer
                          }
                        >
                          <Image
                            className={
                              styles.image
                            }
                            src={
                              (
                                image as ImageDocument
                              ).url
                            }
                            alt={
                              (
                                image as ImageDocument
                              ).alt ||
                              (
                                image as ImageDocument
                              ).defaultAlt
                            }
                            height={100}
                            width={100}
                            unoptimized
                            priority={false}
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
    </div>
  );
}

function CollageLoading() {
  return (
    <div className="w-1/2 h-[120px] bg-yellow-600 rounded-xl flex items-center justify-center">
      Loading...
    </div>
  );
}
