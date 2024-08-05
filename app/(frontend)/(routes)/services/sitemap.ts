import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services: Array<{
    service: string;
  }> | null = await fetch(
    `${DOMAIN}/api/frontend/service/slugs`,
    { next: { revalidate: 1 * 60 * 60 } }
  ).then((res) => res.json());

  if (!services) return [];

  return services.map(({ service }) => ({
    url: `${DOMAIN}/services/${service}`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "hourly"
  }));

  // return [];
}
