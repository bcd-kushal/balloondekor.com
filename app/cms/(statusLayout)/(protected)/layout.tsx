/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ReactNode,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

// hooks
import { SearchContextProvider } from "@/hooks/useSearchContext";

// fetchAPIs
import { validateAuth } from "@/fetchAPIs/cms/auth";

// components
import Header from "@/components/cms/layout/header/Header";
import { LoadingPreviewComponent } from "@/components/cms/loaders/LoadingSpin";
import NavSidebar from "@/components/cms/layout/navSidebar/NavSidebar";

// styles
import styles from "./layout.module.css";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  const { push } = useRouter();
  const SIDEBAR_ID = "__cms_sidebar__";
  const DIMENSION_BOUNDARY = 640;
  const SIDEBAR_WIDTH = {
    smallScreen: {
      collapsed: "0px",
      stretched: "220px"
    },
    desktopScreen: {
      collapsed: "70px",
      stretched: "272px"
    }
  };

  const [user, setUser] = useState<string>("");
  const [screenW, setScreenW] =
    useState<number>(0);
  const [sidebarOpen, setSidebarOpen] =
    useState<boolean>(() => {
      return typeof window !== "undefined"
        ? localStorage.getItem("sidebarOpen") ===
          "true"
          ? true
          : false
        : false;
    });

  const handleSidebarTrigger = () => {
    setSidebarOpen((prev) => !prev);
    localStorage.setItem(
      "sidebarOpen",
      String(!sidebarOpen)
    );
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenW((prev) => innerWidth);
    });
  }, [screenW]);

  useEffect(() => {
    setScreenW((prev) => innerWidth);
  }, [user]);

  const handleGetUser = (): void => {
    validateAuth()
      .then((responseData) => {
        const { userName } = responseData.data;

        setUser(userName);
      })
      .catch((responseData) => {
        setUser("");
        push("/cms");
      });
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-[100dvh] flex items-center min-w-screen">
        <LoadingPreviewComponent title="admin panel" />
      </div>
    );
  }

  return (
    <SearchContextProvider>
      {/* wrapper --------------------------------- */}
      <div className="bg-card-primary w-[100dvw] h-[100dvh] flex items-stretch justify-start">
        {/* LEFT SIDEBAR ================ */}
        <aside
          className="flex flex-col items-stretch justify-start"
          id={SIDEBAR_ID}
          style={{
            width: sidebarOpen
              ? screenW < DIMENSION_BOUNDARY
                ? SIDEBAR_WIDTH.smallScreen
                    .stretched
                : SIDEBAR_WIDTH.desktopScreen
                    .stretched
              : screenW < DIMENSION_BOUNDARY
                ? SIDEBAR_WIDTH.smallScreen
                    .collapsed
                : SIDEBAR_WIDTH.desktopScreen
                    .collapsed
          }}
        >
          <h1
            className={`h-[48px] sm:h-[56px] px-4 flex items-center ${sidebarOpen ? "justify-between" : "justify-center"}  border-r-[1.5px] border-[#12122120] `}
          >
            <span
              className={`text-[18px] select-none font-semibold text-pink-500 ${sidebarOpen ? "block" : "hidden"}`}
            >
              balloondekor
            </span>
            {screenW < DIMENSION_BOUNDARY ? (
              <span></span>
            ) : (
              <HamburgerCollapsible
                onClick={handleSidebarTrigger}
              />
            )}
          </h1>
          <nav className="h-full">
            <div
              className={` bg-card-primary max-h-[calc(100dvh_-_48px)] sm:max-h-[calc(100dvh_-_56px)] pt-3 relative overflow-y-scroll scrollbar-hide px-4  border-r-[1.5px] border-[#12122120] h-full ${styles.sidebar}`}
            >
              <NavSidebar
                isSidebarOpen={sidebarOpen}
              />
            </div>
          </nav>
        </aside>

        {/* RIGHT SIDEBAR ================ */}
        {/* header ---------- */}
        <section className="flex flex-col items-stretch justify-start w-full">
          <div className="h-[48px] sm:h-[56px] bg-orange-400 w-full">
            <div
              className={`relative h-full bg-card-primary border-b-[1.5px] border-[#12122120] ${styles.header}`}
            >
              <Header
                user={user}
                onClick={handleSidebarTrigger}
                showBurger={
                  screenW < DIMENSION_BOUNDARY
                }
              />
            </div>
          </div>
          {/* main content ------- */}
          <main className="h-full">
            <div
              className={`bg-backdrop-primary relative h-full ${styles.page}`}
            >
              {children}
            </div>
          </main>
        </section>
      </div>
    </SearchContextProvider>
  );
}

export function HamburgerCollapsible({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className="p-[12px] rounded-full transition-colors duration-300 hover:bg-[#12121215] cursor-pointer"
    >
      <HamburgerMenuIcon />
    </span>
  );
}
