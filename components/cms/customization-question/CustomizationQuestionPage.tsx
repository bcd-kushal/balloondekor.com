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
import CustomizationQuestionList from "@/components/cms/customization-question/CustomizationQuestionList";
import Paginate from "@/components/common/Paginate";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/generalTag";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getCustomizationQuestions,
  activateCustomizationQuestion,
  deleteCustomizationQuestion
} from "@/fetchAPIs/cms/customizationQuestion";

// types
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";
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
import styles from "@/components/cms/customization-question/customizationQuestionPage.module.css";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function CustomizationQuestionPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [
    customizationQuestions,
    setCustomizationQuestions
  ] = useState<CustomizationQuestionDocument[]>(
    []
  );

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
  const handleGetCustomizationQuestions =
    (): void => {
      setCustomizationQuestions([]);
      getCustomizationQuestions({
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
            setCustomizationQuestions(
              responseData.data as CustomizationQuestionDocument[]
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
  const handleToggleCustomizationQuestionActive =
    (
      customizationQuestionId: string,
      isActive: boolean
    ): void => {
      activateCustomizationQuestion(
        customizationQuestionId,
        isActive
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            setCustomizationQuestions(
              (prevCustomizationQuestions) =>
                prevCustomizationQuestions.map(
                  (prevCustomizationQuestion) => {
                    if (
                      prevCustomizationQuestion._id ===
                      customizationQuestionId
                    ) {
                      prevCustomizationQuestion.isActive =
                        isActive;
                    }

                    return prevCustomizationQuestion;
                  }
                )
            );
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    };

  const handleDeleteCustomizationQuestion = (
    customizationQuestionId: string
  ): void => {
    deleteCustomizationQuestion(
      customizationQuestionId
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetCustomizationQuestions();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetCustomizationQuestions();
  }, []);

  useEffect(() => {
    handleGetCustomizationQuestions();
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
    handleGetCustomizationQuestions();
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
      title="Customization Questions"
      addBtnTitle="Add customization question"
      tableComponent={
        <CustomizationQuestionList
          offset={offset}
          customizationQuestions={
            customizationQuestions
          }
          onToggleActive={
            handleToggleCustomizationQuestionActive
          }
          onDelete={
            handleDeleteCustomizationQuestion
          }
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
