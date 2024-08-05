/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import BannerCarousel from "@/components/client/BannerCarousel";
import BreadCrumbs from "@/components/frontend/Breadcrumbs";
import Contents from "@/components/ui/serviceCategory/Contents";
import FAQs from "@/components/ui/serviceCategory/FAQs";
import QuickLinks from "@/components/ui/serviceCategory/QuickLinks";
import RelatedCategories from "@/components/ui/serviceCategory/RelatedCategories";
import Services from "@/components/ui/serviceCategory/Services";

// styles
import styles from "@/components/ui/subPage/subPageUI.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";
import { PageDocument } from "@/schemas/cms/page";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { SubPageDocument } from "@/schemas/cms/subPage";
import { sortServices } from "@/lib/sortServices";
import { SERVICE_LIST_SORT_TYPE_LS_KEY } from "@/components/client/service/ServicePage";

type CategoryServicesSortType =
  | "popular"
  | "highToLow"
  | "lowToHigh";

export default function SubPageUI({
  subPage
}: {
  subPage: SubPageDocument;
}) {
  const {
    page,
    slug,
    heading,
    relatedCategories,
    topContent,
    bottomContent,
    banners,
    quickLinks,
    faqs,
    services
  } = subPage;

  const {
    cities,
    currentCity,
    onChangeCurrentCity
  } = useCityContext();

  useEffect(() => {
    if (subPage?.city && !currentCity) {
      onChangeCurrentCity(
        (subPage.city as CityDocument).name
      );
    }
  }, [cities]);

  const [serviceList, setServiceList] = useState<
    ServiceDocument[]
  >(
    sortServices({
      services: services as ServiceDocument[],
      filterType: "popular",
      city: currentCity
        ? (currentCity as CityDocument).name
        : ""
    })
  );

  const [filterType, setFilterType] =
    useState<CategoryServicesSortType>("popular");

  useEffect(() => {
    const prevSortType = sessionStorage.getItem(
      SERVICE_LIST_SORT_TYPE_LS_KEY
    ) as CategoryServicesSortType | null;

    if (prevSortType)
      setFilterType((prev) => prevSortType);
  }, []);

  useEffect(() => {
    setServiceList((prev) =>
      sortServices({
        services: serviceList,
        filterType: filterType,
        city: currentCity
          ? (currentCity as CityDocument).name
          : ""
      })
    );

    sessionStorage.setItem(
      SERVICE_LIST_SORT_TYPE_LS_KEY,
      filterType
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  return (
    <main className={` ${styles.container}`}>
      <h1 className={styles.heading}>
        {heading}
      </h1>
      <BreadCrumbs
        slugs={[
          (
            (page as PageDocument)
              .category as ServiceCategoryDocument
          ).slug,
          (page as PageDocument).slug,
          slug
        ]}
      />
      {/* SORT BY OPTIONS =========================== */}
      <div className="flex items-center justify-start max-sm:gap-7 gap-5 overflow-x-scroll scrollbar-hide text-[16px] max-sm:mt-2">
        <span className="max-sm:hidden border-b-[3px] border-transparent">
          Sort by:
        </span>
        <span className="sm:hidden border-b-[3px] border-transparent">
          Sort:
        </span>
        <div
          onClick={() =>
            filterType === "popular"
              ? () => {}
              : setFilterType("popular")
          }
          className={`border-b-[3px] py-3 px-2 sm:px-4 cursor-pointer transition-all duration-300 whitespace-nowrap ${filterType === "popular" ? "border-pink-600 text-pink-600 font-medium" : "border-transparent hover:text-pink-600"}`}
        >
          Popularity
        </div>
        <div
          onClick={() =>
            filterType === "highToLow"
              ? () => {}
              : setFilterType("highToLow")
          }
          className={`border-b-[3px] py-3 px-2 sm:px-4 cursor-pointer transition-all duration-300 whitespace-nowrap ${filterType === "highToLow" ? "border-pink-600 text-pink-600 font-medium" : "border-transparent hover:text-pink-600"}`}
        >
          Price: High to Low
        </div>
        <div
          onClick={() =>
            filterType === "lowToHigh"
              ? () => {}
              : setFilterType("lowToHigh")
          }
          className={`border-b-[3px] py-3 px-2 sm:px-4 cursor-pointer transition-all duration-300 whitespace-nowrap ${filterType === "lowToHigh" ? "border-pink-600 text-pink-600 font-medium" : "border-transparent hover:text-pink-600"}`}
        >
          Price: Low to high
        </div>
      </div>
      {Boolean(topContent) && (
        <Contents content={topContent} />
      )}
      {Boolean(banners.length) && (
        <BannerCarousel banners={banners} />
      )}
      {Boolean(relatedCategories.length) && (
        <RelatedCategories
          categories={
            relatedCategories as ServiceCategoryDocument[]
          }
        />
      )}
      {Boolean(quickLinks.length) && (
        <QuickLinks quickLinks={quickLinks} />
      )}
      {Boolean(services.length) && (
        <Services services={serviceList} />
      )}
      {Boolean(bottomContent) && (
        <Contents content={bottomContent} />
      )}
      {Boolean(faqs.length) && (
        <FAQs faqs={faqs} />
      )}
    </main>
  );
}
