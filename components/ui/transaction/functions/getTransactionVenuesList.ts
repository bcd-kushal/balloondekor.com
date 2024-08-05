import getVenues from "@/fetchAPIs/cms/venue";
import { PaginationResponseDataType } from "@/types/cms/api";
import { SetStateAction } from "react";
import { VenueDocument } from "@/schemas/services/venue";

export const getTransactionVenuesList = (
  setVenue: React.Dispatch<
    SetStateAction<VenueDocument[]>
  >
): void => {
  getVenues({
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
        const venuesList: VenueDocument[] =
          response.data as VenueDocument[];

        setVenue((prev) => venuesList);
      }
    )
    .catch(
      (
        responseData: PaginationResponseDataType
      ) => {
        console.error(
          "failed to get venues in cart"
        );
      }
    );
};
