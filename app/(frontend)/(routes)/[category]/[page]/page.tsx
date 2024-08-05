// Components
import Page from "@/components/frontend/Page";
import { DOMAIN } from "@/constants/cms/apiRoute";

import {
  Metadata,
  ResolvingMetadata
} from "next";

export async function generateMetadata(
  {
    params: { category, page }
  }: {
    params: {
      category: string;
      page: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch metadata
  const metadata = await fetch(
    `${DOMAIN}/api/frontend/page/${page}/meta?category=${category}`
  ).then(async (res) => (await res.json()).data);

  const metaParent = {
    keywords: (await parent)?.keywords || [],
    category: (await parent)?.category || "",
    twitter: (await parent)?.twitter || "",
    openGraph: (await parent)?.openGraph || {}
  };

  const CURR_PATH = `${DOMAIN}/${category}/${page}`;

  return {
    title: metadata?.title || "",
    description: metadata?.description || "",
    keywords: [
      ...(metadata?.keywords || []),
      ...(metaParent?.keywords || [])
    ],
    category: `${metaParent?.category}: services in ${page}`,
    bookmarks: CURR_PATH,
    openGraph: {
      ...(metaParent?.openGraph || {}),
      title: metadata?.title || "",
      description: metadata?.description || "",
      url: CURR_PATH
    },
    alternates: {
      canonical: new URL(CURR_PATH)
    },
    metadataBase: new URL(CURR_PATH)
  };
}

// SSG
export async function generateStaticParams() {
  const slugs = await fetch(
    `${DOMAIN}/api/frontend/page/slugs`,
    {
      next: { revalidate: 300 }
    }
  ).then(async (res) => await res.json());

  return slugs;
}

export default function PageRoute({
  params: { category, page }
}: {
  params: {
    category: string;
    page: string;
  };
}) {
  return (
    <Page
      categorySlug={category}
      pageSlug={page}
    />
  );
}
