export type SchemaGeneratorType = {
  currPath: string;
  // faq ----------------------------------------
  hasFAQ: boolean;
  faqData?: { q: string; a: string }[];
  // breadcrumbs --------------------------------
  hasBreadcrumbs: boolean;
  breadcrumbsData?: {
    label: string;
    link: string;
    others?: any;
  }[];
  // webpage -------------------------------------
  isWebpage: boolean;
  webpageData?: {
    title: string;
    alternateName?: string;
    description?: string;
    image?: string;
    isService?: {
      name: string;
      price: {
        default: number;
        lowest: number;
        highest: number;
        currency: string;
      };
      rating: number;
      totalRatings: number;
      image: string;
      review: {
        review: string;
        rating: {
          value: number;
          bestRating: number;
          worstRating: number;
        };
        name: string;
      }[];
    };
  };
};
