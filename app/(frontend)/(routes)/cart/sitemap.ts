import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${DOMAIN}/cart/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  // return [];
}
