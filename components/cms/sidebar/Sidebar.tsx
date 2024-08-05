/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import Image from "next/image";

// components
import Section from "./Section";
import SortForm, {
  getSortFormConfig
} from "./SortForm";
import FilterForm, {
  getFilterFormConfig
} from "./FilterForm";

// types
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";

// styles
import styles from "./sidebar.module.css";

export default function Sidebar({
  sidebar,
  sort,
  filter
}: {
  sidebar: SidebarType;
  sort: SortType;
  filter: FilterType;
}) {
  // states
  const [show, setShow] = useState<boolean>(
    sidebar.isShown
  );

  // sync inner & outer states
  useEffect(() => {
    setShow(sidebar.isShown);
  }, [sidebar.isShown]);

  // update outer state when hiding
  useEffect(() => {
    if (!show) {
      sidebar.onHide();
    }
  }, [show]);

  return (
    <aside
      className={` ${styles.container} ${show ? styles.shown : ""}`}
    >
      <Image
        className={styles.closeIcon}
        src="/icons/close-icon.svg"
        alt="close Image"
        height={20}
        width={20}
        unoptimized
        onClick={() => setShow(false)}
      />
      <Section
        heading="Sort Categories"
        config={getSortFormConfig({
          sortBy: sort.sortBy.default || "",
          orderBy: sort.orderBy.default || ""
        })}
      >
        <SortForm sort={sort} />
      </Section>
      <Section
        heading="Filter Categories"
        config={getFilterFormConfig({
          filterBy: "",
          keyword: "",
          fromDate: "",
          toDate: ""
        })}
      >
        <FilterForm filter={filter} />
      </Section>
    </aside>
  );
}
