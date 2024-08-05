export interface OptionType {
  label: string;
  value: string;
}

export interface PageOptionType
  extends OptionType {
  category?: string;
}

// // faq
// export type FAQType = {
//   id?: number | string;
//   question: string;
//   answer: string;
// };

// // folder
// export type FolderType = {
//   id: number;
//   name: string;
//   label: string;
//   deleted: number;
//   createdAt: number;
//   updatedAt: number;
// };

// // image
// export type ImageType = {
//   id?: number;
//   folderId?: number;
//   folderName?: string;
//   name: string;
//   data: string;
//   extension: string;
//   defaultAlt: string;
//   alt?: string;
//   width: number;
//   height: number;
//   size: number;
//   url?: string;
//   isDeleted?: number;
//   createdAt?: number;
//   updatedAt?: number;
// };

// // link-image
// export type LinkImageType = {
//   id?: number | string;
//   label: string;
//   url: string;
//   image: ImageType | number;
// };

// // seo-schema
// export type RatingSchemaType = {
//   "@type": string;
//   bestRating: number | string;
//   ratingCount: number | string;
//   ratingValue: number | string;
// };

// export type OffersSchemaType = {
//   "@type": string;
//   highPrice: number | string;
//   lowPrice: number | string;
//   offerCount: number | string;
//   priceCurrency: string | string;
// };

// export type SchemaDataType = {
//   "@context": string;
//   "@type": string;
//   name: string;
//   aggregateRating?: RatingSchemaType;
//   offers?: OffersSchemaType;
// };

// export type SchemaType = {
//   id?: number;
//   data: SchemaDataType;
// };
