/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  SetStateAction,
  useEffect,
  useState
} from "react";

// components
import Paginate from "@/components/common/Paginate";

// styles
import {
  FilterSVG,
  PlusSVG,
  RecycleSVG,
  SortAZSVG,
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Limit from "@/components/cms/Limit";
import Section from "@/components/cms/filter/Section";
import SortForm, {
  getSortFormConfig
} from "@/components/cms/filter/SortForm";
import FilterForm, {
  getFilterFormConfig
} from "@/components/cms/filter/FilterForm";
import {
  FilterType,
  SortType
} from "@/types/cms/sidebar";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Input from "../../form/Input";
import { OptionType } from "@/types/cms/form";

export default function PageWithTable(
  props: {
    title: string;
    addBtnTitle?: string;
    addBtnQueryParams?: string;
    tableComponent: JSX.Element;
    noAddBtn?: boolean;
    pagination?: {
      count: number;
      limit: number;
      resetPagination: boolean;
      setResetPagination: React.Dispatch<
        SetStateAction<boolean>
      >;
      setOffset: React.Dispatch<
        SetStateAction<number>
      >;
    };
    entries?: {
      limit: number;
      setLimit: React.Dispatch<
        SetStateAction<number>
      >;
    };
    sort?: SortType;
    filter?: FilterType;
    willHaveFilterByCategory?: boolean;
    serviceCategoryOptions?: OptionType[];
    defaultCategory?: string;
    showBin?: boolean;
    showingBin?: boolean;
    setActiveCategory?: (
      activeCategory: string
    ) => void;
    onToggleBin?: () => void;
  } & (
    | {
        toggleBtn?: true;
        toggleValue?: boolean;
        onToggle?: () => void;
      }
    | {
        toggleBtn?: false;
      }
  )
) {
  const {
    title,
    addBtnTitle,
    addBtnQueryParams,
    tableComponent,
    noAddBtn,
    pagination,
    entries,
    filter,
    sort,
    willHaveFilterByCategory,
    serviceCategoryOptions,
    defaultCategory,
    showBin,
    showingBin,
    toggleBtn,
    setActiveCategory,
    onToggleBin
  } = props;

  const [isClicked, setIsClicked] =
    useState<boolean>(false);

  const currPath: string = usePathname();
  const DEFAULT_SORT_CONFIG: SortType = {
    sortBy: {
      default: "",
      options: [],
      val: "",
      set: () => {}
    },
    orderBy: {
      default: "",
      options: [],
      val: "",
      set: () => {}
    }
  };
  const DEFAULT_FILTER_CONFIG: FilterType = {
    filterBy: {
      options: [],
      set: () => {},
      val: ""
    },
    keyword: {
      val: "",
      set: () => {}
    },
    fromDate: {
      val: "",
      set: () => {}
    },
    toDate: {
      val: "",
      set: () => {}
    }
  };

  const handleCategoryFiltering = (
    categoryValue: string
  ) => {
    setActiveCategory &&
      setActiveCategory(categoryValue);
  };

  return (
    <div
      className={`w-full h-[calc(100dvh_-_51px)] max-h-[calc(100dvh_-_51px)] relative flex flex-col items-stretch justify-stretch overflow-y-scroll scrollbar-hide`}
    >
      <div className="px-[20px] pt-[32px] pb-[16px] flex justify-between w-full">
        <h2 className="text-[24px] text-[#121212] capitalize">
          {title}
        </h2>
        <div className="flex items-center justify-end">
          {noAddBtn ? (
            !toggleBtn ? (
              <></>
            ) : (
              <div
                onClick={
                  toggleBtn
                    ? props.onToggle
                    : () => {}
                }
                className="flex items-center justify-end gap-[10px] text-[16px] cursor-pointer"
              >
                <span>Show Popup</span>
                {toggleBtn ? (
                  props.toggleValue ? (
                    <SwitchOnSVG
                      dimensions={24}
                      stroke="#00aa00"
                    />
                  ) : (
                    <SwitchOffSVG
                      dimensions={24}
                      stroke="#aa0000"
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            )
          ) : (
            <>
              {!willHaveFilterByCategory ? (
                <></>
              ) : (
                <div className="flex items-center justify-end text-[13px]">
                  <span>Category:</span>
                  <div className="scale-[0.85]">
                    <Input
                      variant="dropdown"
                      title=""
                      isRequired={false}
                      defaultValue={
                        defaultCategory || "All"
                      }
                      options={
                        serviceCategoryOptions as OptionType[]
                      }
                      name=""
                      hasSubmitted={false}
                      setValue={(value) => {
                        handleCategoryFiltering(
                          value as string
                        );
                      }}
                      showError={false}
                      errorMessage="No"
                    />
                  </div>
                </div>
              )}
              {showingBin ? (
                <></>
              ) : (
                <Link
                  href={`${currPath}/add${addBtnQueryParams || ""}`}
                  className="py-[8px] px-[12px] rounded-lg bg-[#121212] text-white flex items-center justify-center gap-[8px] ml-6"
                >
                  <PlusSVG className="mb-[2px]" />
                  <span className="text-[14px]">
                    {addBtnTitle
                      ? addBtnTitle
                      : `Add ${title}`}
                  </span>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className={`h-full relative overflow-y-scroll scrollbar-hide px-5`}
      >
        {tableComponent}
      </div>
      <div
        className={`border-t-[1px] max-h-[55px] border-[#12121220] px-5 py-3 flex items-center justify-between w-full`}
      >
        <section className="text-[14px] -translate-x-9 flex items-center justify-start gap-5 scale-90">
          {showBin && onToggleBin ? (
            <div onClick={onToggleBin}>
              <RecycleSVG
                className="cursor-pointer"
                dimensions={25}
              />
            </div>
          ) : (
            <></>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-[16px] gap-3 font-medium min-h-[42px] cursor-pointer transition-all duration-200 hover:bg-black hover:text-white flex items-center justify-center py-3 px-5 rounded-lg border-[1.5px] border-black/30">
                <SortAZSVG dimensions={18} /> Sort
              </div>
            </DialogTrigger>
            <DialogContent className="py-10 px-7">
              <Section
                heading="Sort Categories"
                config={getSortFormConfig({
                  sortBy:
                    sort?.sortBy.default || "",
                  orderBy:
                    sort?.orderBy.default || ""
                })}
              >
                <SortForm
                  sort={
                    sort
                      ? sort
                      : DEFAULT_SORT_CONFIG
                  }
                />
              </Section>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="text-[16px] gap-3 font-medium min-h-[42px] cursor-pointer transition-all duration-200 hover:bg-black hover:text-white flex items-center justify-center py-3 px-5 rounded-lg border-[1.5px] border-black/30">
                <FilterSVG dimensions={18} />{" "}
                Filter
              </div>
            </DialogTrigger>
            <DialogContent className="py-10 px-8">
              <Section
                heading="Filter Data"
                config={getFilterFormConfig({
                  filterBy: "",
                  keyword: "",
                  fromDate: "",
                  toDate: ""
                })}
              >
                <FilterForm
                  filter={
                    filter
                      ? filter
                      : DEFAULT_FILTER_CONFIG
                  }
                />
              </Section>
            </DialogContent>
          </Dialog>
          {!entries ? (
            <></>
          ) : (
            <Limit
              defaultValue={entries.limit}
              setValue={entries.setLimit}
            />
          )}
        </section>
        {pagination && (
          <section className="max-w-[380px] overflow-x-scroll scrollbar-hide">
            <Paginate
              count={pagination.count}
              limit={pagination.limit}
              reset={pagination.resetPagination}
              setReset={
                pagination.setResetPagination
              }
              setOffset={pagination.setOffset}
            />
          </section>
        )}
      </div>
    </div>
  );
}
