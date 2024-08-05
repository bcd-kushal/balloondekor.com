import names from "../data/customers.json";
import surnames from "../data/surnames.json";
import {
  customerBucketIndex,
  customerChainIndex
} from "./_customerIndex";
import { getRandomLocation } from "./_locationIndex";
import {
  getBadReviewIndex,
  reviewsHashTable
} from "./_ratingIndex";

function roundToHalf(number: number) {
  if (number % 1 === 0 || number % 1 === 0.5)
    return number;
  if (number % 1 < 0.5)
    return Math.floor(number) + 0.5;
  return Math.ceil(number);
}

export const generateRandomCustomers = ({
  limit,
  serviceId,
  cities
}: {
  limit: number;
  serviceId: string;
  cities: string[];
}): Array<{
  customerName: string;
  location: string;
  totalRating: number;
}> => {
  // PROCESS REVIEWS =======================================================================
  const badReviewIndex = getBadReviewIndex(
    serviceId,
    limit
  );
  let reviews = Array.from({ length: limit }).map(
    (_, i) => reviewsHashTable(serviceId, i)
  );
  reviews[badReviewIndex.index] =
    badReviewIndex.badReview;

  // PROCESS LOCATIONS =====================================================================
  const locations = Array.from({
    length: limit
  }).map((_, i) =>
    getRandomLocation(serviceId, i, cities)
  );

  // PROCESS NAMES =========================================================================
  const k = 2;
  const index = customerBucketIndex(serviceId);
  const nameIndices = Array.from({
    length: limit
  }).map((_, i) => [
    (index + i + k) % 16,
    customerChainIndex(
      serviceId,
      names[index].length,
      i + k
    )
  ]);
  const surnameIndices = Array.from({
    length: limit
  }).map((_, i) => [
    (index + i + k) % 16,
    customerChainIndex(
      serviceId,
      surnames[index].length,
      i + k
    )
  ]);

  const namesList: string[] = Array.from({
    length: limit
  }).map(
    (_, i) =>
      `${names[nameIndices[i][0]][nameIndices[i][1]]} ${surnames[surnameIndices[i][0]][surnameIndices[i][1]]}`
  );

  return Array.from({ length: limit }).map(
    (_, index) => ({
      customerName: namesList[index],
      totalRating: roundToHalf(
        Number(reviews[index].toFixed(2))
      ),
      location: locations[index]
    })
  );
};
