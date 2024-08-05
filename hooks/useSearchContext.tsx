"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useState
} from "react";

// types
type SearchContextValueType = {
  searchRef: HTMLInputElement | null;
  search: boolean;
  keyword: string;
  setSearchRef: (
    searchRef: HTMLInputElement | null
  ) => void;
  setSearch: (search: boolean) => void;
  setKeyword: (search: string) => void;
};

// context
const SearchContext = createContext<
  SearchContextValueType | undefined
>(undefined);

// context provider
export function SearchContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // states
  const [searchRef, setSearchRef] =
    useState<HTMLInputElement | null>(null);
  const [search, setSearch] =
    useState<boolean>(false);
  const [keyword, setKeyword] =
    useState<string>("");

  // context value
  const searchContextValue: SearchContextValueType =
    {
      searchRef,
      search,
      keyword,
      setSearchRef,
      setSearch,
      setKeyword
    };

  return (
    <SearchContext.Provider
      value={searchContextValue}
    >
      {children}
    </SearchContext.Provider>
  );
}

// hook
export const useSearchContext =
  (): SearchContextValueType => {
    const context = useContext(SearchContext);

    if (!context) {
      throw new Error(
        "useSearchContext must be used within a SearchContextProvider"
      );
    }

    return context;
  };
