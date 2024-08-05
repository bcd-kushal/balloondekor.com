/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type ScreenContextValueType = {
  isMobile: boolean;
  width: number;
  height: number;
};

// context
const ScreenContext = createContext<
  ScreenContextValueType | undefined
>(undefined);

// context provider
export function ScreenContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [viewportSize, setViewportSize] =
    useState({
      width:
        typeof window !== "undefined"
          ? window.innerWidth
          : 0,
      height:
        typeof window !== "undefined"
          ? window.innerHeight
          : 0
    });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener(
      "resize",
      handleResize
    );
    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <ScreenContext.Provider
      value={{
        isMobile: viewportSize.width <= 640,
        width: viewportSize.width,
        height: viewportSize.height
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
}

// hook
export const useScreenContext =
  (): ScreenContextValueType => {
    const context = useContext(ScreenContext);

    if (!context) {
      throw new Error(
        "useScreenContext must be used within a ScreenContextProvider"
      );
    }

    return context;
  };
