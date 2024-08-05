import FooterUI from "@/components/cms/footer/ui/Footer";

import { DOMAIN } from "@/constants/cms/apiRoute";

import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";

async function getFooterLinkSections() {
  const res = await fetch(
    `${DOMAIN}/api/cms/footer-link-section?populate=true&active=true&sortBy=order&orderBy=asc`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result.data;
}

export default async function Footer() {
  const footerLinkSection: FooterLinkSectionDocument[] =
    // [];
    await getFooterLinkSections();

  return (
    <FooterUI
      footerLinkSections={footerLinkSection}
    />
  );
}
