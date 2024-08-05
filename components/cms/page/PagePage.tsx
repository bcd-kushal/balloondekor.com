/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import PageList from "./PageList";
import PageBinList from "./PageBinList";

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
  getPages,
  activatePage,
  softDeletePage,
  hardDeletePage,
  restorePage
} from "@/fetchAPIs/cms/page";

// types
import { PageDocument } from "@/schemas/cms/page";
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
import { OptionType } from "@/types/cms/form";
import { getServiceCategoryOptions } from "@/fetchAPIs/cms/serviceCategory";

export default function PagePage({
  filterCategory
}: {
  filterCategory: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [pages, setPages] = useState<
    PageDocument[]
  >([]);
  const [binPages, setBinPages] = useState<
    PageDocument[]
  >([]);
  const [
    serviceCategoryOptions,
    setServiceCategoryOptions
  ] = useState<OptionType[]>([
    { label: "All", value: "all" }
  ]);
  const [
    activeFilterCategory,
    setActiveFilterCategory
  ] = useState<string>(filterCategory);

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
    useState<string>(
      filterCategory ? "category" : ""
    );
  const [keyword, setKeyword] = useState<string>(
    activeFilterCategory || ""
  );
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
  const handleGetPages = () => {
    setPages([]);
    getPages({
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
          setPages(
            responseData.data as PageDocument[]
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

  const handleGetBinPages = () => {
    setBinPages([]);
    getPages({
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
          setBinPages(
            responseData.data as PageDocument[]
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

  const handleGetServiceCategoryOptions = () => {
    getServiceCategoryOptions()
      .then((res) =>
        setServiceCategoryOptions([
          ...serviceCategoryOptions,
          ...res.data
        ])
      )
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleTogglePageActive = (
    pageId: string,
    isActive: boolean
  ): void => {
    activatePage(pageId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setPages((prevPages) =>
          prevPages.map((prevPage) => {
            if (prevPage._id === pageId) {
              prevPage.isActive = isActive;
            }

            return prevPage;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleRestorePage = (
    pageId: string
  ): void => {
    restorePage(pageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeletePage = (
    pageId: string
  ): void => {
    softDeletePage(pageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeletePage = (
    pageId: string
  ): void => {
    hardDeletePage(pageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetPages();
    handleGetBinPages();
    handleGetServiceCategoryOptions();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinPages();
    } else {
      handleGetPages();
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
    handleGetPages();
  }, [offset]);

  useEffect(() => {
    handleGetBinPages();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinPages();
    } else {
      setCount(0);
      setOffset(0);
      handleGetPages();
    }
    setResetPagination(true);
  }, [showBin]);

  useEffect(() => {
    setFilterBy("category");
    setKeyword(activeFilterCategory);
  }, [activeFilterCategory]);

  return (
    <PageWithTable
      title={showBin ? "Deleted Pages" : "Pages"}
      tableComponent={
        showBin ? (
          <PageBinList
            offset={binOffset}
            pages={binPages}
            onRestore={handleRestorePage}
            onDelete={handleHardDeletePage}
          />
        ) : (
          <PageList
            offset={offset}
            pages={pages}
            onToggleActive={
              handleTogglePageActive
            }
            onDelete={handleSoftDeletePage}
          />
        )
      }
      addBtnTitle="Add Page"
      pagination={{
        count: showBin ? binCount : count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      sort={sort}
      filter={filter}
      willHaveFilterByCategory
      serviceCategoryOptions={
        serviceCategoryOptions
      }
      defaultCategory={activeFilterCategory}
      showBin={true}
      showingBin={showBin}
      setActiveCategory={setActiveFilterCategory}
      onToggleBin={() =>
        setShowBin((prevShowBin) => !prevShowBin)
      }
    />
  );
}
