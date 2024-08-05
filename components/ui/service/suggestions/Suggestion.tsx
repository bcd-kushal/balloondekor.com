// libraries
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// styles
import styles from "@/components/ui/service/suggestions/suggestion.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";
import { ImageDocument } from "@/schemas/cms/image";
import { PriceDocument } from "@/schemas/cms/service";

export default function Suggestion({
  slug,
  image: { alt, defaultAlt, url },
  name,
  priceDetails,
  isMobile
}: {
  slug: string;
  image: ImageDocument;
  name: string;
  priceDetails: PriceDocument;
  isMobile: boolean;
}) {
  const { currentCity } = useCityContext();

  const [mrp, setMrp] = useState<number>(
    priceDetails?.base?.mrp
  );
  const [price, setPrice] = useState<number>(
    priceDetails?.base?.price
  );
  const [discount, setDiscount] =
    useState<number>(
      Math.round(((mrp - price) * 100) / mrp)
    );

  useEffect(() => {
    if (currentCity) {
      const currentCityPrice =
        priceDetails?.cities?.filter(
          ({ city }) =>
            (city as CityDocument)._id ===
            currentCity._id
        );

      if (currentCityPrice?.length) {
        setMrp(currentCityPrice[0].mrp);
        setPrice(currentCityPrice[0].price);
      } else {
        setMrp(priceDetails?.base?.mrp);
        setPrice(priceDetails?.base?.price);
      }
    } else {
      setMrp(priceDetails?.base?.mrp);
      setPrice(priceDetails?.base?.price);
    }
  }, [priceDetails, currentCity]);

  useEffect(() => {
    setDiscount(
      Math.round(((mrp - price) * 100) / mrp)
    );
  }, [mrp, price]);

  return (
    <Link href={`/services/${slug}`}>
      <article
        className={
          isMobile
            ? "flex flex-col items-start justify-center gap-1 w-[180px] pr-4"
            : styles.container
        }
      >
        <Image
          className={styles.image}
          src={url}
          alt={alt || defaultAlt}
          width={250}
          height={250}
        />
        <section className={styles.info}>
          <div className={styles.name}>
            {name}
          </div>
          <span className={styles.priceContainer}>
            <span className={styles.price}>
              {`₹ ${price}`}
            </span>
            {Boolean(discount) && (
              <>
                <del className={styles.mrp}>
                  {`₹ ${mrp}`}
                </del>
                <span className={styles.discount}>
                  {`(${discount}% off)`}
                </span>
              </>
            )}
          </span>
        </section>
      </article>
    </Link>
  );
}
