/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import ServiceList from "@/components/cms/service/ServiceList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/service";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getServices,
  activateService,
  softDeleteService,
  restoreService,
  hardDeleteService
} from "@/fetchAPIs/cms/service";
import { getServiceCategoryOptions } from "@/fetchAPIs/cms/serviceCategory";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";
import { OptionType } from "@/types/cms/form";
import ServiceBinList from "./ServiceBinList";

export default function ServicePage({
  filterCategory
}: {
  filterCategory: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [services, setServices] = useState<
    ServiceDocument[]
  >([]);
  const [binServices, setBinServices] = useState<
    ServiceDocument[]
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
  const handleGetServices = (): void => {
    setServices([]);
    getServices({
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
          setServices(
            responseData.data as ServiceDocument[]
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

  const handleGetBinServices = (): void => {
    setBinServices([]);
    getServices({
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
          setBinServices(
            responseData.data as ServiceDocument[]
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

  const handleToggleServiceActive = (
    serviceId: string,
    isActive: boolean
  ): void => {
    activateService(serviceId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setServices((prevServices) =>
          prevServices.map((prevService) => {
            if (prevService._id === serviceId) {
              prevService.isActive = isActive;
            }

            return prevService;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleRestoreService = (
    serviceId: string
  ): void => {
    restoreService(serviceId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinServices();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSoftDeleteService = (
    serviceId: string
  ): void => {
    softDeleteService(serviceId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetServices();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleHardDeleteService = (
    serviceId: string
  ): void => {
    hardDeleteService(serviceId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetBinServices();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetServices();
    handleGetBinServices();
    handleGetServiceCategoryOptions();
  }, []);

  useEffect(() => {
    if (showBin) {
      handleGetBinServices();
    } else {
      handleGetServices();
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
    handleGetServices();
  }, [offset]);

  useEffect(() => {
    handleGetBinServices();
  }, [binOffset]);

  useEffect(() => {
    if (showBin) {
      setBinCount(0);
      setBinOffset(0);
      handleGetBinServices();
    } else {
      setCount(0);
      setOffset(0);
      handleGetServices();
    }
    setResetPagination(true);
  }, [showBin]);

  useEffect(() => {
    setFilterBy("category");
    setKeyword(activeFilterCategory);
  }, [activeFilterCategory]);

  return (
    <PageWithTable
      title={
        showBin ? "Deleted Services" : "Services"
      }
      addBtnTitle="Add service"
      tableComponent={
        showBin ? (
          <ServiceBinList
            offset={binOffset}
            services={binServices}
            onRestore={handleRestoreService}
            onDelete={handleHardDeleteService}
          />
        ) : (
          <ServiceList
            offset={offset}
            services={services}
            onToggleActive={
              handleToggleServiceActive
            }
            onDelete={handleSoftDeleteService}
          />
        )
      }
      pagination={{
        count: showBin ? binCount : count,
        limit: limit,
        setOffset: setOffset,
        resetPagination: resetPagination,
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
