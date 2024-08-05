/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import RelationList from "@/components/cms/relation/RelationList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/relation";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getRelations,
  activateRelation,
  deleteRelation
} from "@/fetchAPIs/cms/relation";

// types
import { RelationDocument } from "@/schemas/cms/relation";
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

export default function RelationPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [Relations, setRelations] = useState<
    RelationDocument[]
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
  const handleGetRelations = (): void => {
    setRelations([]);
    getRelations({
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
          setRelations(
            responseData.data as RelationDocument[]
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
  // lifecycle
  const handleToggleRelationActive = (
    relationId: string,
    isActive: boolean
  ): void => {
    activateRelation(relationId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setRelations((prevRelation) =>
          prevRelation.map((prevRelation) => {
            if (prevRelation._id === relationId) {
              prevRelation.isActive = isActive;
            }

            return prevRelation;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteRelation = (
    relationId: string
  ): void => {
    deleteRelation(relationId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetRelations();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetRelations();
  }, []);

  useEffect(() => {
    handleGetRelations();
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
    handleGetRelations();
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
      title="Relations"
      addBtnTitle="Add relation"
      tableComponent={
        <RelationList
          offset={offset}
          relations={Relations}
          onToggleActive={
            handleToggleRelationActive
          }
          onDelete={handleDeleteRelation}
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