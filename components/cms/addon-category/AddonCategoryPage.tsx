/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import AddonCategoryList from "@/components/cms/addon-category/AddonCategoryList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/addonCategory";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getAddonCategories,
  activateAddonCategory,
  softDeleteAddonCategory,
  restoreAddonCategory,
  hardDeleteAddonCategory
} from "@/fetchAPIs/cms/addonCategory";

// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
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
import AddonCategoryBinList from "./AddonCategoryBinList";

export default function AddonCategoryPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [addonCategories, setAddonCategories] =
    useState<AddonCategoryDocument[]>([]);
  const [
    binAddonCategories,
    setBinAddonCategories
  ] = useState<AddonCategoryDocument[]>([]);

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
  const handleGetAddonCategories = (): void => {
    setAddonCategories([]);
    getAddonCategories({
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
          setAddonCategories(
            responseData.data as AddonCategoryDocument[]
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

  const handleGetBinAddonCategories =
    (): void => {
      setBinAddonCategories([]);
      getAddonCategories({
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
            setBinAddonCategories(
              responseData.data as AddonCategoryDocument[]
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

  const handleToggleAddonCategoryActive = (
    addonCategoryId: string,
    isActive: boolean
  ): void => {
    activateAddonCategory(
      addonCategoryId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setAddonCategories(
          (prevAddonCategories) =>
            prevAddonCategories.map(
              (prevAddonCategory) => {
                if (
                  prevAddonCategory._id ===
                  addonCategoryId
                ) {
                  prevAddonCategory.isActive =
                    isActive;
                }

                return prevAddonCategory;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleRestoreAddonCategory = (
    addonCategoryId: string
  ): void => {
    restoreAddonCategory(addonCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinAddonCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeleteAddonCategory = (
    addonCategoryId: string
  ): void => {
    softDeleteAddonCategory(addonCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetAddonCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeleteAddonCategory = (
    addonCategoryId: string
  ): void => {
    hardDeleteAddonCategory(addonCategoryId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinAddonCategories();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetAddonCategories();
    handleGetBinAddonCategories();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinAddonCategories();
    } else {
      handleGetAddonCategories();
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
    handleGetAddonCategories();
  }, [offset]);

  useEffect(() => {
    handleGetBinAddonCategories();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinAddonCategories();
    } else {
      setCount(0);
      setOffset(0);
      handleGetAddonCategories();
    }
    setResetPagination(true);
  }, [showBin]);

  return (
    <PageWithTable
      title={
        showBin
          ? "Deleted Addon Categories"
          : "Addon Categories"
      }
      tableComponent={
        showBin ? (
          <AddonCategoryBinList
            offset={binOffset}
            addonCategories={binAddonCategories}
            onRestore={handleRestoreAddonCategory}
            onDelete={
              handleHardDeleteAddonCategory
            }
          />
        ) : (
          <AddonCategoryList
            offset={offset}
            addonCategories={addonCategories}
            onToggleActive={
              handleToggleAddonCategoryActive
            }
            onDelete={
              handleSoftDeleteAddonCategory
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
