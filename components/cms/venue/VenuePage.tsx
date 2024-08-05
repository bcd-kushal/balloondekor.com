"use client";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/venue";
import getVenues, {
  deleteVenue,
  updateVenue,
  activateVenue
} from "@/fetchAPIs/cms/venue";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";
import { VenueDocument } from "@/schemas/services/venue";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";
import { useEffect, useState } from "react";
import VenueList from "./VenueList";

export default function VenuePage() {
  // hooks ===========================================
  const { addStatus } = useStatusContext();
  const { keyword: searchKeyword } =
    useSearchContext();

  // states ===========================================
  const [venues, setVenues] = useState<
    VenueDocument[]
  >([]);

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

  const [resetPagination, setResetPagination] =
    useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);

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

  // handlers ===========================================
  const handleGetVenues = (): void => {
    setVenues([]);
    getVenues({
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
          response: PaginationResponseDataType
        ) => {
          setCount(response.count);
          setVenues(
            response.data as VenueDocument[]
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

  const handleDeleteVenue = (
    id: string
  ): void => {
    deleteVenue(id)
      .then((response: ResponseDataType) => {
        addStatus(response.status);
        handleGetVenues();
      })
      .catch((err: ResponseDataType) => {
        addStatus([
          {
            type: "error",
            message: String(err.status)
          }
        ]);
      });
  };

  const handleToggleVenueActiveStatus = (
    id: string,
    newStatus: boolean
  ): void => {
    activateVenue(id, newStatus)
      .then((response: ResponseDataType) => {
        addStatus(response.status);
        handleGetVenues();
      })
      .catch((err: ResponseDataType) => {
        addStatus([
          {
            type: "error",
            message: String(err.status)
          }
        ]);
      });
  };

  // useEffects ==========================================
  useEffect(() => {
    handleGetVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetVenues();
    setResetPagination(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    handleGetVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <PageWithTable
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      title="Venues"
      addBtnTitle="Add venue"
      tableComponent={
        <VenueList
          offset={offset}
          venues={venues}
          onToggleActive={
            handleToggleVenueActiveStatus
          }
          onDelete={handleDeleteVenue}
        />
      }
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      sort={sort}
      filter={filter}
    />
  );
}
