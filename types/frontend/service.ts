import { PriceDocument } from "@/schemas/cms/service";

export type OtherServicesType = {
  link: string;
  price: PriceDocument;
  totalReviews: number;
}[];

export type OtherServicesCityWiseType = {
  link: string;
  price: number;
  totalReviews: number;
}[];
