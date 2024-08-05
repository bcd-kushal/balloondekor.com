import { DOMAIN } from "@/constants/frontend/apiRoute";

import ServiceCategory from "@/components/frontend/ServiceCategory";

import {
  Metadata,
  ResolvingMetadata
} from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  {
    params: { category: categoryName }
  }: {
    params: { category: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch metadata
  const METADATA_FETCH_ROUTE = `${DOMAIN}/api/frontend/service-category/${categoryName}/meta`;

  const metadata = await fetch(
    METADATA_FETCH_ROUTE
  ).then(async (res) => await res.json());

  const metaParent = {
    images:
      (await parent).openGraph?.images || [],
    keywords: (await parent)?.keywords || [],
    category: (await parent)?.category || "",
    twitter: (await parent)?.twitter,
    openGraph: (await parent)?.openGraph || {}
  };

  const CURR_PATH = `${DOMAIN}/${categoryName}`;

  return {
    title: metadata?.data?.title || "",
    description:
      metadata?.data?.description || "",
    keywords: [
      ...(metadata?.data?.keywords || []),
      ...(metaParent?.keywords || [])
    ],
    category: `${metaParent?.category}: service categories`,
    bookmarks: CURR_PATH,
    openGraph: {
      ...(metaParent?.openGraph || {}),
      title: metadata?.data?.title || "",
      description:
        metadata?.data?.description || "",
      url: CURR_PATH
    },
    alternates: {
      canonical: new URL(CURR_PATH)
    },
    metadataBase: new URL(CURR_PATH)
  };
}

export async function generateStaticParams() {
  const slugs = await fetch(
    `${DOMAIN}/api/frontend/service-category/slugs`,
    {
      next: { revalidate: 300 }
    }
  ).then((res) => res.json());

  return slugs;
}

export default function CategoryRoute({
  params: { category }
}: {
  params: {
    category: string;
  };
}) {
  return <ServiceCategory slug={category} />;
}
