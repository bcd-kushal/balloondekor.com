import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: Array<{
    category: string;
    page: string;
    subPage: string;
  }> | null = await fetch(
    `${DOMAIN}/api/frontend/sub-page/slugs`,
    { next: { revalidate: 1 * 60 * 60 } }
  ).then((res) => res.json());

  if (!routes) return [];

  return routes.map(
    ({ category, page, subPage }) => ({
      url: `${DOMAIN}/${category}/${page}/${subPage}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "hourly"
    })
  );

  // return [];
}
