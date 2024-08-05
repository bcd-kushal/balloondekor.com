"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { SECTIONS } from "@/constants/cms/navSidebar";
import { usePathname } from "next/navigation";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  getFailedOrders,
  getOrders
} from "@/fetchAPIs/cms/order";
import { filteredOrders } from "../../orders/OrdersPage";
import { OrderDocument } from "@/schemas/cms/order";

type Icon = JSX.Element;

const sidebarRouteLinks: {
  [key: string]: {
    primaryTab: string;
    innerTab?: string;
  };
} = {};

SECTIONS.forEach(
  ({ heading, headingLinkPath, links }) => {
    // if inner links exist -------------------
    if (links.length) {
      links.forEach((link) => {
        sidebarRouteLinks[link.path] = {
          primaryTab: heading,
          innerTab: link.label
        };
      });
    }

    if (headingLinkPath) {
      sidebarRouteLinks[headingLinkPath] = {
        primaryTab: heading.toLowerCase()
      };
    }
  }
);

const activeTab = ({
  currPath
}: {
  currPath: string;
}) => {
  let deepestValidPath: {
    path: string;
    tabs: {
      primaryTab: string;
      innerTab?: string;
    };
  } = { path: "", tabs: { primaryTab: "" } };

  Object.entries(sidebarRouteLinks).forEach(
    ([key, obj]) => {
      if (
        currPath.includes(key) &&
        deepestValidPath.path.length < key.length
      ) {
        deepestValidPath = {
          path: key,
          tabs: {
            primaryTab: obj.primaryTab,
            innerTab: obj.innerTab
              ? obj.innerTab
              : undefined
          }
        };
      }
    }
  );

  return deepestValidPath;
};

type NavLink = {
  label: string;
  path: string;
};

type Props = {
  icon: Icon;
  heading: string;
  headingLinkPath?: string;
  links: NavLink[];
  isSidebarOpen: boolean;
};

export default function Section(props: Props) {
  const {
    icon,
    heading,
    headingLinkPath,
    links,
    isSidebarOpen
  } = props;

  const [showLinks, setShowLink] =
    useState<boolean>(false);
  const [orderCount, setOrderCount] = useState<{
    newOrders: number;
    inProgress: number;
    delivered: number;
    failed: number;
    cancelled: number;
  }>({
    cancelled: 0,
    delivered: 0,
    failed: 0,
    inProgress: 0,
    newOrders: 0
  });

  const handleTabClick = () => {
    setShowLink(
      (prevShowLinks) => !prevShowLinks
    );
  };

  const currPath = usePathname();

  const activeRoute = activeTab({
    currPath: currPath
  });

  // TAILWIND COMMON STYLING for sidebar main tabs =====================
  const inactiveTabStyles = `flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} cursor-pointer rounded-xl transition-all duration-500 ${isSidebarOpen ? "py-[8px] px-[16px]" : "p-[8px] aspect-square"} mb-[8px] hover:bg-tab-hover hover:text-tab-primary `;
  const openTabStyles = `flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} cursor-pointer rounded-xl transition-all duration-500 ${isSidebarOpen ? "py-[8px] px-[16px]" : "p-[8px] aspect-square"} mb-[8px] bg-tab-hover text-tab-primary `;
  const activeTabStyles = `flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} cursor-pointer rounded-xl transition-all duration-500 ${isSidebarOpen ? "py-[8px] px-[16px]" : "p-[8px] aspect-square"} mb-[8px] bg-tab-primary text-white shadow-lg shadow-[#0075FE35]`;

  const isActivePrimaryTab =
    heading.toLowerCase() ===
    activeRoute.tabs.primaryTab.toLowerCase();

  const thisTabStyles = isActivePrimaryTab
    ? activeTabStyles
    : inactiveTabStyles;

  useEffect(() => {
    const newOrderCount = async () => {
      const orders = await getOrders({
        populate: false,
        filterBy: "",
        fromDate: "",
        keyword: "",
        limit: 10000,
        offset: 0,
        orderBy: "",
        orderType: "cancelled",
        sortBy: "",
        toDate: ""
      });

      const newOrders = filteredOrders({
        orders: orders.data
          ? (orders.data as OrderDocument[])
          : [],
        orderType: "new-order"
      });

      const inProgress = filteredOrders({
        orders: orders.data
          ? (orders.data as OrderDocument[])
          : [],
        orderType: "in-progress"
      });

      const delivered = filteredOrders({
        orders: orders.data
          ? (orders.data as OrderDocument[])
          : [],
        orderType: "delivered"
      });

      const cancelled = filteredOrders({
        orders: orders.data
          ? (orders.data as OrderDocument[])
          : [],
        orderType: "cancelled"
      });

      const failed = await getFailedOrders({
        populate: false,
        filterBy: "",
        fromDate: "",
        keyword: "",
        limit: 10000,
        offset: 0,
        orderBy: "",
        sortBy: "",
        toDate: ""
      });

      setOrderCount((prev) => ({
        cancelled: cancelled
          ? cancelled.length
          : 0,
        failed: failed.data
          ? failed.data.length
          : 0,
        newOrders: newOrders
          ? newOrders.length
          : 0,
        delivered: delivered
          ? delivered.length
          : 0,
        inProgress: inProgress
          ? inProgress.length
          : 0
      }));
    };

    newOrderCount();
  }, [currPath]);

  const badgeTabs = [
    "new orders",
    "in progress",
    "delivered",
    "failed",
    "cancelled"
  ];

  const orderCountBadge = (
    label: string
  ): { color: string; count: number } => {
    if (label === "new orders")
      return {
        color: "bg-indigo-600/70",
        count: orderCount.newOrders
      };
    if (label === "in progress")
      return {
        color: "bg-amber-600/70",
        count: orderCount.inProgress
      };
    if (label === "delivered")
      return {
        color: "bg-emerald-600/70",
        count: orderCount.delivered
      };
    if (label === "failed")
      return {
        color: "bg-slate-600/70",
        count: orderCount.failed
      };
    if (label === "cancelled")
      return {
        color: "bg-red-600/70",
        count: orderCount.cancelled
      };
    return {
      color: "bg-red-600/70",
      count: 0
    };
  };

  return (
    <section className={`select-none`}>
      {headingLinkPath ? (
        // no sub-header header tab --------------------------
        <Link
          className={thisTabStyles}
          href={headingLinkPath as string}
          prefetch={true}
        >
          <SectionHeader
            icon={icon}
            heading={heading}
            hasLinks={Boolean(links.length)}
            showLinks={showLinks}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
      ) : (
        // sidebar tab with sub-headers ------------------------
        <div
          className={
            showLinks && !isActivePrimaryTab
              ? openTabStyles
              : thisTabStyles
          }
          onClick={handleTabClick}
        >
          <SectionHeader
            icon={icon}
            heading={heading}
            hasLinks={Boolean(links.length)}
            showLinks={showLinks}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      )}
      {/* sub headers ----------------------------- */}
      {links.length && showLinks ? (
        <div className="overflow-hidden pb-[8px]">
          <div>
            {links.map(({ label, path }, i) => (
              <Link
                href={path}
                key={i}
                prefetch={true}
                className={`group relative flex items-center ${isSidebarOpen ? "py-[4px] px-[16px] justify-stretch" : "p-[12px] justify-center"} rounded-lg transition-colors duration-300 mb-[8px] cursor-pointer text-[16px] ${label.toLowerCase() === activeRoute.tabs.innerTab?.toLowerCase() ? "bg-tab-hover" : "hover:bg-transparent"}`}
              >
                <span
                  className={`w-[36px] flex items-center ${isSidebarOpen ? "justify-start" : " justify-center"} group-hover:text-tab-primary transition-colors duration-300 ${label.toLowerCase() === activeRoute.tabs.innerTab?.toLowerCase() ? "text-tab-primary" : ""}`}
                >
                  <PlayIcon
                    width={12}
                    height={12}
                  />
                </span>
                <span
                  className={`${isSidebarOpen ? "" : "hidden"} whitespace-nowrap my-[4px] group-hover:text-tab-primary transition-colors duration-300 capitalize text-[12px] ${label.toLowerCase() === activeRoute.tabs.innerTab?.toLowerCase() ? "text-tab-primary" : ""}`}
                >
                  {label}
                </span>

                {/* count badge -------------------- */}
                {badgeTabs.includes(label) ? (
                  <span
                    className={`absolute right-[8px] min-w-[20px] flex items-center justify-center rounded-lg py-[1px] px-[6px] text-[11px] font-medium ${orderCountBadge(label).color} text-white top-1/2 -translate-y-1/2`}
                  >
                    {orderCountBadge(label).count}
                  </span>
                ) : (
                  <></>
                )}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
