// Constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// Components
import SubPage from "@/components/frontend/SubPage";

import {
  Metadata,
  ResolvingMetadata
} from "next";

export async function generateMetadata(
  {
    params: { category, page, subPage }
  }: {
    params: {
      category: string;
      page: string;
      subPage: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch metadata
  const metadata = await fetch(
    `${DOMAIN}/api/frontend/sub-page/${subPage}/meta?category=${category}&page=${page}`
  ).then(async (res) => (await res.json()).data);

  const metaParent = {
    images:
      (await parent).openGraph?.images || [],
    keywords: (await parent)?.keywords || [],
    category: (await parent)?.category || "",
    twitter: (await parent)?.twitter || "",
    openGraph: (await parent)?.openGraph || {}
  };

  const CURR_PATH = `${DOMAIN}/${category}/${page}/${subPage}`;

  return {
    title: metadata?.title,
    description: metadata?.description,
    keywords: [
      ...(metadata?.keywords || []),
      ...(metaParent?.keywords || [])
    ],
    category: `${metaParent.category}: services in ${page} (${subPage})`,
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
    `${DOMAIN}/api/frontend/sub-page/slugs`,
    {
      next: { revalidate: 300 }
    }
  ).then((res) => res.json());

  return slugs;
}

export default function page({
  params: { category, page, subPage }
}: {
  params: {
    category: string;
    page: string;
    subPage: string;
  };
}) {
  return (
    <SubPage
      categorySlug={category}
      pageSlug={page}
      subPageSlug={subPage}
    />
  );
}
