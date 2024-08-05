/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import React, {
  SetStateAction,
  useEffect,
  useState
} from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import PriceUI from "@/components/ui/service/info/PriceUI";

// types
import { CityDocument } from "@/schemas/cms/city";
import { PriceDocument } from "@/schemas/cms/service";

export default function Price({
  priceDetails,
  rating,
  ratingCount,
  priceRef,
  setCurrItemPrice
}: {
  priceDetails: PriceDocument;
  rating: number;
  ratingCount: number;
  priceRef: React.RefObject<HTMLDivElement>;
  setCurrItemPrice: React.Dispatch<
    SetStateAction<number>
  >;
}) {
  const { currentCity } = useCityContext();

  const [mrp, setMrp] = useState<number>(
    priceDetails.base.mrp
  );
  const [price, setPrice] = useState<number>(
    priceDetails.base.price
  );
  const [discount, setDiscount] =
    useState<number>(
      Math.round(((mrp - price) * 100) / mrp)
    );

  useEffect(() => {
    if (currentCity) {
      const currentCityPrice =
        priceDetails.cities.filter(
          ({ city }) =>
            (city as CityDocument)._id ===
            currentCity._id
        );

      if (currentCityPrice.length) {
        setMrp(currentCityPrice[0].mrp);
        setPrice(currentCityPrice[0].price);
        setCurrItemPrice(
          (prev) => currentCityPrice[0].price
        );
      } else {
        setMrp(priceDetails.base.mrp);
        setPrice(priceDetails.base.price);
        setCurrItemPrice(priceDetails.base.price);
      }
    } else {
      setMrp(priceDetails.base.mrp);
      setPrice(priceDetails.base.price);
      setCurrItemPrice(
        (prev) => priceDetails.base.price
      );
    }
  }, [priceDetails, currentCity]);

  useEffect(() => {
    setDiscount(
      Math.round(((mrp - price) * 100) / mrp)
    );
  }, [mrp, price]);

  return (
    <PriceUI
      mrp={mrp}
      price={price}
      discount={discount}
      rating={rating}
      ratingCount={ratingCount}
      priceRef={priceRef}
    />
  );
}
