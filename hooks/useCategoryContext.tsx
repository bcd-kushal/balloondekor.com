// /* eslint-disable react-hooks/exhaustive-deps */

// "use client";

// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState
// } from "react";

// import { getServiceCategory } from "@/fetchAPIs/frontend/serviceCategory";

// type CategoryContextValueType = {
//   isLoading: boolean;
//   isValidCategory: (slug: string) => boolean;
// };

// const CategoryContext = createContext<
//   CategoryContextValueType | undefined
// >(undefined);

// export function CategoryContextProvider({
//   children
// }: {
//   children: ReactNode;
// }) {
//   const [slugs, setSlugs] = useState<string[]>(
//     []
//   );

//   const handleCheckValidCategory = (
//     slug: string
//   ): boolean =>
//     slugs.length > 0 && slugs.includes(slug);

//   useEffect(() => {
//     getServiceCategory().then((fetchedSlugs) => {
//       setSlugs([...fetchedSlugs]);
//     });
//   }, []);

//   return (
//     <CategoryContext.Provider
//       value={{
//         isLoading: slugs.length === 0,
//         isValidCategory: handleCheckValidCategory
//       }}
//     >
//       {children}
//     </CategoryContext.Provider>
//   );
// }

// export const useCategoryContext =
//   (): CategoryContextValueType => {
//     const categoryContext = useContext(
//       CategoryContext
//     );

//     if (!categoryContext) {
//       throw new Error(
//         "useCategoryContext must be used within a CategoryContextProvider"
//       );
//     }

//     return categoryContext;
//   };
