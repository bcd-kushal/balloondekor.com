/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import React, {
  SetStateAction,
  useEffect,
  useState
} from "react";
// components
import AddonsUI from "@/components/ui/service/addons/AddonsUI";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import {
  CartDetailsType,
  SelectedAddonType,
  UpdatingAddonsFunctionType
} from "@/components/ui/transaction/static/types";
import { Schema } from "mongoose";
import { ImageDocument } from "@/schemas/cms/image";
import { DateTimeType } from "@/components/ui/service/info/Info";
import {
  getLocalStorage,
  setLocalStorage
} from "@/lib/localStorage";
import { LOCALSTORAGE_CART_KEY } from "@/fetchAPIs/cart/getCartDetails";
import { useRouter } from "next/navigation";

type UncleanAddonDataType = {
  id: any;
  name: string;
  price: number;
  count: number;
  img: Schema.Types.ObjectId | ImageDocument;
}[];

type AddonsModalType = {
  heading: string;
  addons: SelectedAddonDocument[];
  price?: number;
  serviceName: string;
  service: ServiceDocument;
  dateTime: DateTimeType;
  inCart?: boolean;
  selectedAddonsList?: Array<{
    addonId: string;
    count: number;
    pricePerUnit: number;
  }>;
  serviceTotalCount?: number;
  relatedDate?: string;
  updateAddons?: UpdatingAddonsFunctionType;
  onSelectAddons?: React.Dispatch<
    SetStateAction<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >
  >;
  saveCart?: () => void;
};

export default function AddonsModal({
  heading,
  addons,
  price,
  serviceName,
  service,
  dateTime,
  inCart,
  selectedAddonsList,
  serviceTotalCount,
  relatedDate,
  updateAddons,
  onSelectAddons,
  saveCart
}: AddonsModalType) {
  const [addonCategories, setAddonCategories] =
    useState<string[]>([]);
  const [
    activeAddonCategoryIndex,
    setActiveAddonCategoryIndex
  ] = useState<number>(0);

  const [
    activeCategoryAddons,
    setActiveCategoryAddons
  ] = useState<AddonDocument[]>([]);

  const [selectedAddons, setSelectedAddons] =
    useState<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >(selectedAddonsList || []);

  const [priceDetails, setPriceDetails] =
    useState<{
      servicePrice: number;
      addonsPrice: number;
    }>({
      servicePrice: serviceTotalCount
        ? (price || 0) * serviceTotalCount
        : price || 0,
      addonsPrice: 0
    });

  const [
    overallSelectionDetails,
    setOverallSelectionDetails
  ] = useState<CartDetailsType>({
    serviceId: service._id,
    serviceName: serviceName,
    serviceImage: {
      alt: (
        service.media.primary as ImageDocument
      ).alt,
      url: (
        service.media.primary as ImageDocument
      ).url
    },
    pricePerUnit: price || 0,
    totalUnits: serviceTotalCount || 1,
    eventDate: dateTime.date,
    eventTime: `${dateTime.startTime} - ${dateTime.endTime}`,
    addons: []
  });

  const router = useRouter();

  const handleGetCount = (
    requestAddonId: string
  ): number =>
    selectedAddons.filter(
      ({ addonId }) => addonId === requestAddonId
    )[0].count;

  const handleChangeCount = (
    updateAddonId: string,
    newCount: number
  ) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.map(
        ({ addonId, count, pricePerUnit }) => ({
          addonId,
          pricePerUnit,
          count:
            addonId === updateAddonId
              ? newCount
              : count
        })
      )
    );
  };

  const getCleanCartReadyData = (
    data: UncleanAddonDataType
  ): SelectedAddonType[] => {
    return data.map(
      ({ id, name, price, count, img }) => ({
        label: name,
        price: price,
        amount: count,
        image: {
          url: (img as ImageDocument).url,
          alt: (img as ImageDocument).alt
        },
        id: id
      })
    );
  };

  useEffect(() => {
    if (onSelectAddons)
      onSelectAddons((prev) => selectedAddons);
  }, [selectedAddons]);

  useEffect(() => {
    setAddonCategories([
      "popular",
      ...Array.from(
        new Set(
          addons.map(
            ({ addon }) =>
              (
                (addon as AddonDocument)
                  .category as AddonCategoryDocument
              ).name
          )
        )
      ).sort()
    ]);
  }, []);

  useEffect(() => {
    setSelectedAddons((prev) =>
      addons.map(({ addon }) => ({
        addonId: (addon as AddonDocument)._id,
        pricePerUnit: (addon as AddonDocument)
          .price,
        count: (() => {
          if (prev.length) {
            const filteredData = prev.filter(
              ({ addonId }) =>
                addonId ===
                (addon as AddonDocument)._id
            );
            if (
              filteredData &&
              filteredData.length
            )
              return filteredData[0].count;
          }
          return 0;
        })()
      }))
    );
  }, [addons]);

  useEffect(() => {
    if (addonCategories.length) {
      if (
        addonCategories[
          activeAddonCategoryIndex
        ] === "popular"
      ) {
        setActiveCategoryAddons(
          addons
            .filter(({ isPopular }) => isPopular)
            .map(
              ({ addon }) =>
                addon as AddonDocument
            )
        );
      } else {
        setActiveCategoryAddons(
          addons
            .filter(
              ({ addon }) =>
                (
                  (addon as AddonDocument)
                    .category as AddonCategoryDocument
                ).name ===
                addonCategories[
                  activeAddonCategoryIndex
                ]
            )
            .map(
              ({ addon }) =>
                addon as AddonDocument
            )
        );
      }
    }
  }, [addonCategories, activeAddonCategoryIndex]);

  useEffect(() => {
    const data: UncleanAddonDataType =
      selectedAddons
        .filter(
          (selectedAddon) =>
            selectedAddon.count > 0
        )
        .map(
          (selectedAddon) =>
            addons
              .filter(
                ({ addon }) =>
                  (addon as AddonDocument)._id ===
                  selectedAddon.addonId
              )
              .map(({ addon }) => ({
                id: (addon as AddonDocument)._id,
                name: (addon as AddonDocument)
                  .name,
                price: (addon as AddonDocument)
                  .price,
                count: selectedAddon.count,
                img: (addon as AddonDocument)
                  .image
              }))[0]
        );
    const processedAddonsData: SelectedAddonType[] =
      getCleanCartReadyData(data);
    const fullUpdatedCartData: CartDetailsType = {
      serviceId: service._id,
      serviceName: serviceName,
      serviceImage: {
        alt: (
          service.media.primary as ImageDocument
        ).alt,
        url: (
          service.media.primary as ImageDocument
        ).url
      },
      pricePerUnit: price || 0,
      totalUnits: serviceTotalCount || 1,
      eventDate: dateTime.date,
      eventTime: `${dateTime.startTime} - ${dateTime.endTime}`,
      addons: processedAddonsData
    };
    setOverallSelectionDetails(
      (prev) => fullUpdatedCartData
    );
    setPriceDetails((prev) => ({
      servicePrice: serviceTotalCount
        ? (price || 0) * serviceTotalCount
        : price || 0,
      addonsPrice: processedAddonsData.reduce(
        (totalAddonsSum, addon) =>
          (totalAddonsSum +=
            addon.price * addon.amount),
        0
      )
    }));
  }, [selectedAddons]);

  const handleUpdateCart = () => {
    if (updateAddons && relatedDate)
      updateAddons({
        newChosenAddonsCartWrapper:
          overallSelectionDetails,
        relatedDate: relatedDate,
        serviceId: service._id
      });
  };

  const handleSaveToCart = () => {
    const existingData: CartDetailsType[] =
      getLocalStorage(LOCALSTORAGE_CART_KEY);
    if (
      !existingData ||
      (Object.prototype.toString.call(
        existingData
      ) === "[object Object]" &&
        Object.keys(existingData).length === 0)
    ) {
      setLocalStorage(LOCALSTORAGE_CART_KEY, [
        overallSelectionDetails
      ]);
    } else {
      const updatedData = updatedCartData(
        existingData,
        overallSelectionDetails
      );
      setLocalStorage(
        LOCALSTORAGE_CART_KEY,
        updatedData
      );
    }

    router.push("/cart");
  };

  return (
    <AddonsUI
      heading={heading}
      priceDetails={priceDetails}
      categories={addonCategories}
      activeCategoryIndex={
        activeAddonCategoryIndex
      }
      addons={activeCategoryAddons}
      overallData={overallSelectionDetails}
      confirmBtnMsg={
        inCart ? "Confirm" : "Proceed to Cart"
      }
      onChangeActiveCategoryIndex={
        setActiveAddonCategoryIndex
      }
      onGetAddonSelectionCount={handleGetCount}
      onSetAddonSelectionCount={handleChangeCount}
      saveToCart={
        inCart && updateAddons
          ? handleUpdateCart
          : saveCart
            ? saveCart
            : () => {}
      }
    />
  );
}

export const updatedCartData = (
  existingData: CartDetailsType[],
  dataToAdd: CartDetailsType
): CartDetailsType[] => {
  let serviceAlreadyExists: boolean = false;
  const refreshedData = existingData.map(
    (data) => {
      if (
        data.serviceId === dataToAdd.serviceId
      ) {
        serviceAlreadyExists = true;
        return dataToAdd;
      }
      return data;
    }
  );
  if (serviceAlreadyExists) return refreshedData;

  return [dataToAdd, ...refreshedData];
};
