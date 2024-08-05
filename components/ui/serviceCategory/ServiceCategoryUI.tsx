"use client";

// components
import BreadCrumbs from "@/components/frontend/Breadcrumbs";
import Contents from "./Contents";
import FAQs from "./FAQs";
import RelatedCategories from "./RelatedCategories";
import Services from "./Services";

// styles
import styles from "@/components/ui/serviceCategory/serviceCategoryUI.module.css";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import QuickLinks from "./QuickLinks";
import BannerCarousel from "@/components/client/BannerCarousel";
import { useCityContext } from "@/hooks/useCityContext";
import { sortServices } from "@/lib/sortServices";
import { CityDocument } from "@/schemas/cms/city";
import { useEffect, useState } from "react";
import { SERVICE_LIST_SORT_TYPE_LS_KEY } from "@/components/client/service/ServicePage";

type CategoryServicesSortType =
  | "popular"
  | "highToLow"
  | "lowToHigh";

export default function ServiceCategoryUI({
  category,
  services
}: {
  category: ServiceCategoryDocument;
  services: ServiceDocument[];
}) {
  const { currentCity } = useCityContext();

  const [serviceList, setServiceList] = useState<
    ServiceDocument[]
  >(
    sortServices({
      services: services,
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
      {/* TITLE ================================= */}
      <h1 className={styles.heading}>
        {category.heading}
      </h1>
      {/* BREADCRUMBS =========================== */}
      <BreadCrumbs slugs={[category.slug]} />
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
      {/* PAGE DESCRIPTION ====================== */}
      {Boolean(category.topContent) && (
        <Contents content={category.topContent} />
      )}
      {/* BANNERS =============================== */}
      {Boolean(category.banners.length) && (
        // <Banners banners={category.banners} />
        <BannerCarousel
          banners={category.banners}
        />
      )}
      {/* RELATED CATEGORIES ======= */}
      {Boolean(
        category.relatedCategories.length
      ) && (
        <RelatedCategories
          categories={
            category.relatedCategories as ServiceCategoryDocument[]
          }
        />
      )}
      {/* QUICK LINKS =============================== */}
      {Boolean(category.quickLinks.length) && (
        <QuickLinks
          quickLinks={category.quickLinks}
          title={"Quick Links"}
        />
      )}
      {Boolean(
        category.quickLinks.length && (
          <div>quick links</div>
        )
      )}
      {/* [MAIN]: SERVICES ======================== */}
      {Boolean(serviceList.length) && (
        <Services services={serviceList} />
      )}
      {Boolean(category.bottomContent) && (
        <Contents
          content={category.bottomContent}
        />
      )}
      {/* FAQs ===================================== */}
      {Boolean(category.faqs.length) && (
        <FAQs faqs={category.faqs} />
      )}
    </main>
  );
}
