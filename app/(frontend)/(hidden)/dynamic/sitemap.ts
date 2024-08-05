import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: Array<{ slug: string }> | null =
    await fetch(
      `${DOMAIN}/api/frontend/dynamic-page/slugs`,
      { next: { revalidate: 1 * 60 * 60 } }
    ).then((res) => res.json());

  if (!slugs) return [];

  return slugs.map(({ slug }) => ({
    url: `${DOMAIN}/pages/${slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "hourly"
  }));

  // return [];
}
