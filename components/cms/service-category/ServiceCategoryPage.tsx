/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import ServiceCategoryList from "@/components/cms/service-category/ServiceCategoryList";

// constants
import {
  DEFAULT_SORT_BY,
  DEFAULT_ORDER_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/serviceCategory";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getServiceCategories,
  activateServiceCategory,
  softDeleteServiceCategory,
  restoreServiceCategory,
  hardDeleteServiceCategory
} from "@/fetchAPIs/cms/serviceCategory";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";

import PageWithTable from "@/components/common/table/admin/PageWithTable";
import ServiceCategoryBinList from "./ServiceCategoryBinList";

export default function ServiceCategoryPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [
    serviceCategories,
    setServiceCategories
  ] = useState<ServiceCategoryDocument[]>([]);
  const [
    binServiceCategories,
    setBinServiceCategories
  ] = useState<ServiceCategoryDocument[]>([]);

  // sidebar states
  const [showSidebar, setShowSidebar] =
    useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(
    DEFAULT_SORT_BY || ""
  );
  const [orderBy, setOrderBy] = useState<string>(
    DEFAULT_ORDER_BY || ""
  );
  const [filterBy, setFilterBy] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");
  const [fromDate, setFromDate] =
    useState<string>("");
  const [toDate, setToDate] =
    useState<string>("");

  const [showBin, setShowBin] =
    useState<boolean>(false);

  const sidebar: SidebarType = {
    isShown: showSidebar,
    onHide: () => {
      setShowSidebar(false);
    }
  };

  const sort: SortType = {
    sortBy: {
      default: DEFAULT_SORT_BY || "",
      options: SORT_BY_OPTIONS,
      val: sortBy,
      set: setSortBy
    },
    orderBy: {
      default: DEFAULT_ORDER_BY || "",
      options: ORDER_BY_OPTIONS,
      val: orderBy,
      set: setOrderBy
    }
  };

  const filter: FilterType = {
    filterBy: {
      options: FILTER_BY_OPTIONS,
      val: filterBy,
      set: setFilterBy
    },
    keyword: {
      val: keyword,
      set: setKeyword
    },
    fromDate: {
      val: fromDate,
      set: setFromDate
    },
    toDate: {
      val: toDate,
      set: setToDate
    }
  };

  // pagination states
  const [resetPagination, setResetPagination] =
    useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [binCount, setBinCount] =
    useState<number>(0);
  const [binOffset, setBinOffset] =
    useState<number>(0);
  const [limit, setLimit] = useState<number>(30);

  // handlers
  const handleGetServiceCategories = () => {
    setServiceCategories([]);
    getServiceCategories({
      populate: true,
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword: searchKeyword || keyword,
      fromDate,
      toDate
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setCount(responseData.count);
          setServiceCategories(
            responseData.data as ServiceCategoryDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleGetBinServiceCategories = () => {
    setBinServiceCategories([]);
    getServiceCategories({
      populate: true,
      active: false,
      deleted: true,
      offset: binOffset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword: searchKeyword || keyword,
      fromDate,
      toDate
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setBinCount(responseData.count);
          setBinServiceCategories(
            responseData.data as ServiceCategoryDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleToggleServiceCategoryActive = (
    serviceCategoryId: string,
    isActive: boolean
  ): void => {
    activateServiceCategory(
      serviceCategoryId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setServiceCategories(
          (prevServiceCategories) =>
            prevServiceCategories.map(
              (prevServiceCategory) => {
                if (
                  prevServiceCategory._id ===
                  serviceCategoryId
                ) {
                  prevServiceCategory.isActive =
                    isActive;
                }

                return prevServiceCategory;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleRestoreServiceCategory = (
    serviceCategoryId: string
  ): void => {
    restoreServiceCategory(serviceCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinServiceCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeleteServiceCategory = (
    serviceCategoryId: string
  ): void => {
    softDeleteServiceCategory(serviceCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetServiceCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeleteServiceCategory = (
    serviceCategoryId: string
  ): void => {
    hardDeleteServiceCategory(serviceCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetServiceCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetServiceCategories();
    handleGetBinServiceCategories();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinServiceCategories();
    } else {
      handleGetServiceCategories();
    }
    setResetPagination(true);
  }, [
    limit,
    sortBy,
    orderBy,
    filterBy,
    searchKeyword,
    keyword,
    fromDate,
    toDate
  ]);

  useEffect(() => {
    handleGetServiceCategories();
  }, [offset]);

  useEffect(() => {
    handleGetBinServiceCategories();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinServiceCategories();
    } else {
      setCount(0);
      setOffset(0);
      handleGetServiceCategories();
    }
    setResetPagination(true);
  }, [showBin]);

  return (
    <PageWithTable
      title={`${showBin ? "Deleted " : ""}Service Categories`}
      tableComponent={
        showBin ? (
          <ServiceCategoryBinList
            offset={binOffset}
            serviceCategories={
              binServiceCategories
            }
            onRestore={
              handleRestoreServiceCategory
            }
            onDelete={
              handleHardDeleteServiceCategory
            }
          />
        ) : (
          <ServiceCategoryList
            offset={offset}
            serviceCategories={serviceCategories}
            onToggleActive={
              handleToggleServiceCategoryActive
            }
            onDelete={
              handleSoftDeleteServiceCategory
            }
          />
        )
      }
      pagination={{
        count: showBin ? binCount : count,
        limit: limit,
        resetPagination: resetPagination,
        setResetPagination: setResetPagination,
        setOffset: setOffset
      }}
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      sort={sort}
      filter={filter}
      showBin={true}
      showingBin={showBin}
      onToggleBin={() =>
        setShowBin((prevShowBin) => !prevShowBin)
      }
    />
  );
}
