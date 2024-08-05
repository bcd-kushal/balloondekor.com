/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import AddonList from "@/components/cms/addon/AddonList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/addon";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getAddons,
  activateAddon,
  softDeleteAddon,
  restoreAddon,
  hardDeleteAddon
} from "@/fetchAPIs/cms/addon";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";

// styles
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import AddonBinList from "./AddonBinList";

export default function AddonPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [addons, setAddons] = useState<
    AddonDocument[]
  >([]);
  const [binAddons, setBinAddons] = useState<
    AddonDocument[]
  >([]);

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
  const handleGetAddons = (): void => {
    getAddons({
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
          setAddons(
            responseData.data as AddonDocument[]
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

  const handleGetBinAddons = (): void => {
    setBinAddons([]);
    getAddons({
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
          setBinAddons(
            responseData.data as AddonDocument[]
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

  const handleToggleAddonActive = (
    addonId: string,
    isActive: boolean
  ): void => {
    activateAddon(addonId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setAddons((prevAddons) =>
          prevAddons.map((prevAddon) => {
            if (prevAddon._id === addonId) {
              prevAddon.isActive = isActive;
            }

            return prevAddon;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleRestoreAddon = (
    addonId: string
  ): void => {
    restoreAddon(addonId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinAddons();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeleteAddon = (
    addonId: string
  ): void => {
    softDeleteAddon(addonId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetAddons();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeleteAddon = (
    addonId: string
  ): void => {
    hardDeleteAddon(addonId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinAddons();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetAddons();
    handleGetBinAddons();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinAddons();
    } else {
      handleGetAddons();
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
    handleGetAddons();
  }, [offset]);

  useEffect(() => {
    handleGetBinAddons();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinAddons();
    } else {
      setCount(0);
      setOffset(0);
      handleGetAddons();
    }
    setResetPagination(true);
  }, [showBin]);

  return (
    <PageWithTable
      title={
        showBin ? "Deleted Addons" : "Addons"
      }
      pagination={{
        count: showBin ? binCount : count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      tableComponent={
        showBin ? (
          <AddonBinList
            offset={binOffset}
            addons={binAddons}
            onRestore={handleRestoreAddon}
            onDelete={handleHardDeleteAddon}
          />
        ) : (
          <AddonList
            offset={offset}
            addons={addons}
            onToggleActive={
              handleToggleAddonActive
            }
            onDelete={handleSoftDeleteAddon}
          />
        )
      }
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
