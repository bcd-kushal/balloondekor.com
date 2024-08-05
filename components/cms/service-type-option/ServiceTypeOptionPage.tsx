/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Sidebar from "@/components/cms/sidebar/Sidebar";
import PageHeader from "@/components/cms/PageHeader";
import ServiceTypeOptionList from "@/components/cms/service-type-option/ServiceTypeOptionList";
import Paginate from "@/components/common/Paginate";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/serviceTypeOption";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getServiceTypeOptions,
  activateServiceTypeOption,
  deleteServiceTypeOption
} from "@/fetchAPIs/cms/serviceTypeOption";

// types
import { ServiceTypeOptionDocument } from "@/schemas/cms/serviceTypeOption";
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
import styles from "@/components/cms/service-type-option/serviceTypeOptionPage.module.css";

export default function ServiceTypeOptionPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [
    serviceTypeOptions,
    setServiceTypeOptions
  ] = useState<ServiceTypeOptionDocument[]>([]);

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
  const [limit, setLimit] = useState<number>(30);

  // handlers
  const handleGetServiceTypeOptions =
    (): void => {
      setServiceTypeOptions([]);
      getServiceTypeOptions({
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
            setServiceTypeOptions(
              responseData.data as ServiceTypeOptionDocument[]
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

  const handleToggleServiceTypeOptionActive = (
    serviceTypeOptionId: string,
    isActive: boolean
  ): void => {
    activateServiceTypeOption(
      serviceTypeOptionId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setServiceTypeOptions(
          (prevServiceTypeOptions) =>
            prevServiceTypeOptions.map(
              (prevServiceTypeOption) => {
                if (
                  prevServiceTypeOption._id ===
                  serviceTypeOptionId
                ) {
                  prevServiceTypeOption.isActive =
                    isActive;
                }

                return prevServiceTypeOption;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteServiceTypeOption = (
    serviceTypeOptionId: string
  ): void => {
    deleteServiceTypeOption(serviceTypeOptionId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetServiceTypeOptions();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetServiceTypeOptions();
  }, []);

  useEffect(() => {
    handleGetServiceTypeOptions();
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
    handleGetServiceTypeOptions();
  }, [offset]);

  return (
    <div className={styles.container}>
      <Sidebar
        sidebar={sidebar}
        sort={sort}
        filter={filter}
      />
      <div className={styles.header}>
        <PageHeader
          heading="Service Type Options"
          addBtnLabel="add service Type Option"
          addBtnSlug="service-type-option"
          limit={limit}
          setLimit={setLimit}
          toggleShowSidebar={() => {
            setShowSidebar(true);
          }}
        />
      </div>
      <div className={styles.content}>
        <ServiceTypeOptionList
          offset={offset}
          serviceTypeOptions={serviceTypeOptions}
          onToggleActive={
            handleToggleServiceTypeOptionActive
          }
          onDelete={handleDeleteServiceTypeOption}
        />
      </div>
      <div className={styles.pagination}>
        <Paginate
          count={count}
          limit={limit}
          reset={resetPagination}
          setReset={setResetPagination}
          setOffset={setOffset}
        />
      </div>
    </div>
  );
}
