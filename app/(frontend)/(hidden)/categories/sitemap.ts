import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: Array<{
    category: string;
  }> | null = await fetch(
    `${DOMAIN}/api/frontend/service-category/slugs`,
    { next: { revalidate: 1 * 60 * 60 } }
  ).then((res) => res.json());

  if (!slugs) return [];

  return slugs.map(({ category }) => ({
    url: `${DOMAIN}/${category}`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "daily"
  }));

  // return [];
}
