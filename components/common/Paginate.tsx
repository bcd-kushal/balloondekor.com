/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// LIBRARIES
import { useEffect, useState } from "react";

// COMPONENTS
import ReactPaginate from "react-paginate";

// STYLES
import "./paginate.css";
import {
  ArrowLeftSVG,
  ArrowRightSVG
} from "@/constants/svgs/svg";

// EXPORT
export default function Paginate({
  count,
  limit,
  setOffset,
  reset,
  setReset
}: {
  count: number;
  limit: number;
  setOffset: (offset: number) => void;
  reset: boolean;
  setReset: (reset: boolean) => void;
}) {
  // STATES
  const [pageCount, setPageCount] =
    useState<number>(0);
  const [forcePage, setForcePage] =
    useState<number>(0);

  // DATA HANDLERS
  useEffect(() => {
    if (reset) {
      setOffset(0);
      setForcePage(0);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    setPageCount(
      Math.ceil(Number(count) / Number(limit))
    );
  }, [count, limit]);

  // EVENT HANDLERS
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * Number(limit)) %
      Number(count);

    setForcePage(event.selected);
    setOffset(newOffset);
  };

  // RETURN COMPONENT
  return (
    <ReactPaginate
      className={"paginate_container"}
      nextLabel={
        <span className="ml-2">
          <ArrowRightSVG />
        </span>
      }
      breakLabel="..."
      previousLabel={
        <span className="mr-2">
          <ArrowLeftSVG />
        </span>
      }
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={pageCount ? forcePage : -1}
      onPageChange={handlePageClick}
    />
  );
}
