import { DOMAIN } from "@/constants/frontend/apiRoute";

import Service from "@/components/frontend/Service";

import {
  Metadata,
  ResolvingMetadata
} from "next";

export async function generateMetadata(
  {
    params: { service: serviceName }
  }: {
    params: { service: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch metadata
  const METADATA_FETCH_ROUTE = `${DOMAIN}/api/frontend/service/${serviceName}/meta`;
  const metadata = await fetch(
    METADATA_FETCH_ROUTE
  ).then(async (res) => await res.json());

  const metaParent = {
    images:
      (await parent).openGraph?.images || [],
    keywords: (await parent)?.keywords || [],
    category: (await parent)?.category || "",
    twitter: (await parent)?.twitter || "",
    openGraph: (await parent)?.openGraph || {}
  };

  const CURR_PATH = `${DOMAIN}/services/${serviceName}`;

  return {
    title: metadata?.data?.title || "",
    description:
      metadata?.data?.description || "",
    keywords: [
      ...(metadata?.data?.keywords || []),
      ...(metaParent?.keywords || [])
    ],
    category: `${metaParent.category}: services`,
    bookmarks: CURR_PATH,
    openGraph: {
      ...(metaParent?.openGraph || {}),
      title: metadata?.data?.title || "",
      description:
        metadata?.data?.description || "",
      url: CURR_PATH,
      images: metadata?.data?.images || []
    },
    alternates: {
      canonical: new URL(CURR_PATH)
    },
    metadataBase: new URL(CURR_PATH)
  };
}

export async function generateStaticParams() {
  const slugs = await fetch(
    `${DOMAIN}/api/frontend/service/slugs`,
    {
      next: { revalidate: 300 }
    }
  ).then((res) => res.json());

  return slugs;
}

export default function ServiceRoute({
  params: { service }
}: {
  params: {
    service: string;
  };
}) {
  return <Service slug={service} />;
}
