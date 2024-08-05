import { DOMAIN } from "@/constants/frontend/apiRoute";
import { MetadataRoute } from "next";

export default function sitemap({
  id
}: {
  id: string;
}): MetadataRoute.Sitemap {
  const routes: Array<{
    name: string;
    priority?: number;
    lastModified?: Date | string;
    changeFrequency?:
      | "never"
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | undefined;
  }> = [
    {
      name: "",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "dynamic",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "services",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "categories",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "categories/pages",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "categories/pages/subpages",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      name: "images",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily"
    }
  ];

  return routes.map(
    ({
      name,
      priority,
      lastModified,
      changeFrequency
    }) => ({
      url: `${DOMAIN}${name ? `/${name}` : ""}/sitemap.xml`,
      lastModified: lastModified,
      changeFrequency: changeFrequency,
      priority: priority
    })
  );
}
