// libraries
import Image from "next/image";
import Link from "next/link";
import { StarFilledIcon } from "@radix-ui/react-icons";

// components
import Price from "@/components/client/serviceCategory/Price";

// styles
import styles from "@/components/ui/serviceCategory/service.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { PriceDocument } from "@/schemas/cms/service";
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { StarSVG } from "@/constants/svgs/svg";

export default function Service({
  name,
  icon: { alt, defaultAlt, url },
  price,
  rating,
  reviewCount,
  promotionTag
}: {
  name: string;
  icon: ImageDocument;
  price: PriceDocument;
  rating: number;
  reviewCount: number;
  promotionTag: PackageTagDocument[];
}) {
  function getContrastColor(hexColor: string) {
    var r = parseInt(
      hexColor.substring(1, 3),
      16
    );
    var g = parseInt(
      hexColor.substring(3, 5),
      16
    );
    var b = parseInt(
      hexColor.substring(5, 7),
      16
    );

    var luma =
      0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 128 ? "#ffffff" : "#000000";
  }
  return (
    <Link
      className={styles.container}
      href={`/services/${name.toLowerCase().split(" ").join("-")}`}
    >
      {/* IMAGE +++++++++++++++++++++++++++++++++++++++ */}
      <section className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={url || ""}
          width={300}
          height={300}
          alt={alt || defaultAlt}
          quality={60}
          priority={false}
          placeholder="blur"
          blurDataURL={url || ""}
        />

        {/* promotion top right tag --------------------------- */}
        {promotionTag && promotionTag.length ? (
          <span
            className={styles.promotionTag}
            style={{
              background:
                promotionTag[0].colorCode,
              color: getContrastColor(
                promotionTag[0].colorCode
              )
            }}
          >
            {promotionTag[0].name}
          </span>
        ) : (
          <></>
        )}

        {/* rating bottom right tag ----------------------------- */}
        {!rating ? (
          <></>
        ) : (
          <div className={styles.ratingContainer}>
            <span className={styles.ratingBox}>
              <StarSVG
                fill="#ba9f00"
                stroke="#ba9f00"
                className="contrast-150"
                dimensions={13}
              />
              <span className={"pl-1"}>
                {rating}
              </span>
            </span>
            <span className={styles.ratingBox}>
              <span
                className={
                  "border-l-[1px] border-black pl-3"
                }
              >
                {reviewCount}
              </span>
            </span>
          </div>
        )}
      </section>

      {/* DETAILS ++++++++++++++++++++++++++++++++++++++ */}
      <section className={styles.info}>
        {/* Title ------------------------ */}
        <span className={styles.name}>
          {name}
        </span>
        {/* Bottom row: price, reviews etc -------- */}
        <span className={styles.bottomContainer}>
          <Price priceDetails={price} />
          {/* {!rating ? (
            <></>
          ) : (
            <div
              className={styles.ratingContainer}
            >
              <span className={styles.ratingBox}>
                <StarSVG
                  fill="#d4b500"
                  stroke="#d4b500"
                  dimensions={13}
                />
                <span className={"pl-1"}>
                  {rating}
                </span>
              </span>
              <span className={styles.ratingBox}>
                <span
                  className={
                    "border-l-[1px] border-black pl-3"
                  }
                >
                  {reviewCount}
                </span>
              </span>
            </div>
          )} */}
        </span>
      </section>
    </Link>
  );
}
