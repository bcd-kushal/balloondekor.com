import { PaginationResponseDataType } from "@/types/cms/api";
import { SetStateAction } from "react";
import { getOccasions } from "@/fetchAPIs/cms/occasion";
import { OccasionDocument } from "@/schemas/cms/occasion";

export const getTransactionOccasionsList = (
  setOccasion: React.Dispatch<
    SetStateAction<OccasionDocument[]>
  >
): void => {
  getOccasions({
    active: true,
    deleted: false,
    sortBy: "asc",
    filterBy: "",
    fromDate: "",
    keyword: "",
    limit: 1000,
    offset: 0,
    orderBy: "",
    toDate: ""
  })
    .then(
      (response: PaginationResponseDataType) => {
        const occasionList: OccasionDocument[] =
          response.data as OccasionDocument[];

        setOccasion((prev) => occasionList);
      }
    )
    .catch(
      (
        responseData: PaginationResponseDataType
      ) => {
        console.error(
          "failed to get occasions in cart"
        );
      }
    );
};
