/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import SubPageList from "./SubPageList";

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
  getSubPages,
  activateSubPage,
  softDeleteSubPage,
  restoreSubPage,
  hardDeleteSubPage
} from "@/fetchAPIs/cms/subPage";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";
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
import {
  OptionType,
  PageOptionType
} from "@/types/cms/form";
import { getPageOptions } from "@/fetchAPIs/cms/page";
import SubPageBinList from "./SubPageBinList";

export default function SubPagePage({
  filterPage
}: {
  filterPage: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [subPages, setSubPages] = useState<
    SubPageDocument[]
  >([]);
  const [binSubPages, setBinSubPages] = useState<
    SubPageDocument[]
  >([]);
  const [pageOptions, setPageOptions] = useState<
    PageOptionType[]
  >([{ label: "All", value: "all" }]);
  const [activeFilterPage, setActiveFilterPage] =
    useState<string>(filterPage);

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
    useState<string>(filterPage ? "page" : "");
  const [keyword, setKeyword] = useState<string>(
    activeFilterPage || ""
  );
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
  const handleGetSubPages = () => {
    setSubPages([]);
    getSubPages({
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
          setSubPages(
            responseData.data as SubPageDocument[]
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

  const handleGetBinSubPages = () => {
    setSubPages([]);
    getSubPages({
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
          setBinSubPages(
            responseData.data as SubPageDocument[]
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

  const handleGetPageOptions = () => {
    getPageOptions(true)
      .then((res) =>
        setPageOptions([
          ...pageOptions,
          ...res.data
        ])
      )
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleToggleSubPageActive = (
    subPageId: string,
    isActive: boolean
  ): void => {
    activateSubPage(subPageId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setSubPages((prevPages) =>
          prevPages.map((prevPage) => {
            if (prevPage._id === subPageId) {
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

  const handleRestoreSubPage = (
    pageId: string
  ): void => {
    restoreSubPage(pageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinSubPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeleteSubPage = (
    subPageId: string
  ): void => {
    softDeleteSubPage(subPageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetSubPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeleteSubPage = (
    subPageId: string
  ): void => {
    hardDeleteSubPage(subPageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinSubPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetSubPages();
    handleGetBinSubPages();
    handleGetPageOptions();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinSubPages();
    } else {
      handleGetSubPages();
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
    handleGetSubPages();
  }, [offset]);

  useEffect(() => {
    handleGetBinSubPages();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinSubPages();
    } else {
      setCount(0);
      setOffset(0);
      handleGetSubPages();
    }

    setResetPagination(true);
  }, [showBin]);

  useEffect(() => {
    setFilterBy("page");
    setKeyword(activeFilterPage);
  }, [activeFilterPage]);

  return (
    <PageWithTable
      title={
        showBin
          ? "Deleted Sub-Pages"
          : "Sub-Pages"
      }
      tableComponent={
        showBin ? (
          <SubPageBinList
            offset={binOffset}
            subPages={binSubPages}
            onRestore={handleRestoreSubPage}
            onDelete={handleHardDeleteSubPage}
          />
        ) : (
          <SubPageList
            offset={offset}
            subPages={subPages}
            onToggleActive={
              handleToggleSubPageActive
            }
            onDelete={handleSoftDeleteSubPage}
          />
        )
      }
      addBtnTitle="Add Sub-Page"
      addBtnQueryParams={
        activeFilterPage &&
        activeFilterPage !== "All"
          ? `?category=${pageOptions.find(({ value }) => value === activeFilterPage)?.category}&page=${activeFilterPage}`
          : ""
      }
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
      serviceCategoryOptions={pageOptions}
      defaultCategory={activeFilterPage}
      showBin={true}
      showingBin={showBin}
      setActiveCategory={setActiveFilterPage}
      onToggleBin={() =>
        setShowBin((prevShowBin) => !prevShowBin)
      }
    />
  );
}
