import { DOMAIN } from "@/constants/frontend/apiRoute";
import { ImageDocument } from "@/schemas/cms/image";
import { MetadataRoute } from "next";

type ImageResponseType = {
  count: number;
  data: ImageDocument[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const METADATA_FETCH_ROUTE = `${DOMAIN}/api/sitemap/images`;
  const response: Response = await fetch(
    METADATA_FETCH_ROUTE,
    {
      next: { revalidate: 1 * 60 * 60 }
    }
  );

  const images: ImageResponseType =
    await response.json();

  return images.data.map(
    ({ alt, defaultAlt, url }) => ({
      url: url,
      loc: url,
      title: alt || defaultAlt,
      caption: alt || defaultAlt
    })
  );

  // return [];
}
