"use client";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import { useEffect, useState } from "react";
// constants
import {
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/color";
import {
  FilterType,
  SortType
} from "@/types/cms/sidebar";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import LeadsList from "./LeadsList";
import { LeadDocument } from "@/schemas/cms/lead";
import { getLeads } from "@/fetchAPIs/cms/lead";
import { useStatusContext } from "@/hooks/useStatusContext";
import { useSearchContext } from "@/hooks/useSearchContext";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { deleteThisLead } from "@/app/api/frontend/all-leads/controller";
import { DOMAIN } from "@/constants/cms/apiRoute";
import {
  getSettings,
  toggleCallbackDisplaySetting
} from "@/fetchAPIs/cms/settings";
import { SettingDocument } from "@/schemas/cms/setting";

export default function Callbacks() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  const [sortBy, setSortBy] = useState<string>(
    "submittedAt" || ""
  );
  const [orderBy, setOrderBy] = useState<string>(
    "desc" || ""
  );
  const [callbackActive, setCallbackActive] =
    useState<{
      showCallback: boolean;
      id: string;
    }>({ showCallback: true, id: "" });
  const [filterBy, setFilterBy] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");
  const [fromDate, setFromDate] =
    useState<string>("");
  const [toDate, setToDate] =
    useState<string>("");
  const [leads, setLeads] = useState<
    LeadDocument[]
  >([]);
  const [statusToggle, setStatusToggle] =
    useState<boolean>(false);

  const handleGetAllLeads = (): void => {
    setLeads([]);
    getLeads({
      offset: offset,
      limit: limit,
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
          setLeads(
            responseData.data as LeadDocument[]
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

  const sort: SortType = {
    sortBy: {
      default: DEFAULT_SORT_BY || "",
      options: SORT_BY_OPTIONS,
      val: sortBy,
      set: setSortBy
    },
    orderBy: {
      default: "desc" || "",
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

  const handleSwitchLeadType = ({
    id,
    type
  }: {
    id: string;
    type: LeadDocument["status"];
  }): void => {};

  const handleDeleteLead = (id: string): void => {
    console.log({ id });
    fetch(`${DOMAIN}/api/frontend/lead`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => await res.json())
      .then((res: ResponseDataType) => {
        if (res.data) {
          handleGetAllLeads();
          addStatus([
            {
              message: "Deleted successfully",
              type: "success"
            }
          ]);
        } else {
          addStatus([
            {
              message: "Error in deleting",
              type: "error"
            }
          ]);
        }
      });
  };

  const handleGetCallbackSetting = () => {
    getSettings()
      .then((res) => {
        const callbackSettings = {
          showCallback: (
            res.data as SettingDocument
          ).callback,
          id: (res.data as SettingDocument)._id
        };

        setCallbackActive(
          (prev) => callbackSettings
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleGetAllLeads();
    handleGetCallbackSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetAllLeads();
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
    toDate,
    statusToggle
  ]);

  useEffect(() => {
    handleGetAllLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <PageWithTable
      title="Callbacks"
      noAddBtn
      tableComponent={
        <LeadsList
          offset={offset}
          leads={leads}
          setLeads={setLeads}
          onToggleOption={setStatusToggle}
          onDelete={handleDeleteLead}
        />
      }
      pagination={{
        count: count,
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
      toggleBtn={true}
      toggleValue={callbackActive.showCallback}
      onToggle={() => {
        toggleCallbackDisplaySetting(
          callbackActive.id,
          !callbackActive.showCallback
        )
          .then((res) => {
            handleGetCallbackSetting();
            addStatus([
              {
                message: "Updated successfully!",
                type: "success"
              }
            ]);
          })
          .catch((err: any) => {
            addStatus([
              {
                message: "Couldnt update!",
                type: "error"
              }
            ]);
          });
      }}
    />
  );
}
