/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
// import Sidebar from "@/components/cms/sidebar/Sidebar";
// import PageHeader from "@/components/cms/PageHeader";
import ServiceList from "@/components/cms/service/ServiceList";
import Paginate from "@/components/common/Paginate";

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
  getProducts,
  activateProduct,
  deleteProduct
} from "@/fetchAPIs/cms/product";

// types
import { ProductDocument } from "@/schemas/cms/product";
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
// import styles from "@/components/cms/service/servicePage.module.css";
import { PlusSVG } from "@/constants/svgs/svg";
import Link from "next/link";
import ProductList from "./ProductList";

export default function ProductsPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [products, setProducts] = useState<
    ProductDocument[]
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
  const handleGetProducts = (): void => {
    setProducts([]);
    getProducts({
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
          setProducts(
            responseData.data as ProductDocument[]
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

  const handleToggleProductActive = (
    productId: string,
    isActive: boolean
  ): void => {
    activateProduct(productId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) => {
            if (prevProduct._id === productId) {
              prevProduct.isActive = isActive;
            }

            return prevProduct;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteProduct = (
    productId: string
  ): void => {
    deleteProduct(productId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetProducts();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    handleGetProducts();
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
    handleGetProducts();
  }, [offset]);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-stretch justify-stretch`}
    >
      {/* <Sidebar
        sidebar={sidebar}
        sort={sort}
        filter={filter}
      /> */}
      {/* <div className={styles.header}>
        <PageHeader
          heading="Services"
          addBtnLabel="add service"
          addBtnSlug="service"
          limit={limit}
          setLimit={setLimit}
          toggleShowSidebar={() => {
            setShowSidebar(true);
          }}
        />
      </div> */}

      {/* page header ===================== */}
      <div className="px-5 pt-8 pb-4 flex justify-between w-full">
        <h2 className="text-[40px] tracking-[-1.6px] text-[#121212] capitalize">
          All services
        </h2>
        <div className="flex items-center justify-end">
          <Link
            href={`/cms/product/add`}
            className="py-2 px-3 rounded-lg bg-[#121212] text-white flex items-center justify-center gap-2"
          >
            <PlusSVG className="mb-[2px]" />
            <span>Add product</span>
          </Link>
        </div>
      </div>

      {/* table data ======================= */}
      <div
        className={`h-full overflow-y-scroll scrollbar-hide pb-16 px-5`}
      >
        <ProductList
          offset={offset}
          products={products}
          onToggleActive={
            handleToggleProductActive
          }
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* bottom pagination ================= */}
      <div
        className={`absolute w-full bottom-0 bg-backdrop-primary pr-5 border-[1.5px] border-[#12121220] py-2`}
      >
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
