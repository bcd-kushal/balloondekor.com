"use client";
import LinkSection from "./LinkSection";
import SocialSection from "./SocialSection";

import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";

import styles from "@/components/cms/footer/ui/footer.module.css";
import CopyrightSection from "./CopyrightSection";
import { usePathname } from "next/navigation";

const socialSection = {
  _id: "section-i",
  heading: "Socials",
  categories: [
    {
      _id: "category-i",
      title: "Follow Us",
      infos: [
        {
          _id: "info-i",
          label: "Facebook",
          url: "https://www.facebook.com/people/Balloon-Dekor/61555933685272/",
          image: {
            src: "/images/facebook.webp",
            alt: "Facebook Logo"
          }
        },
        {
          _id: "info-ii",
          label: "Instagram",
          url: "https://www.instagram.com/balloondekor.official/",
          image: {
            src: "/images/instagram.webp",
            alt: "Instagram Logo"
          }
        },
        {
          _id: "info-iii",
          label: "Twitter",
          url: "https://x.com/balloondekor",
          image: {
            src: "/images/twitter.webp",
            alt: "Twitter Logo"
          }
        },
        // {
        //   _id: "info-iv",
        //   label: "YouTube",
        //   url: "/",
        //   image: {
        //     src: "/images/youtube.webp",
        //     alt: "YouTube Logo"
        //   }
        // },
        {
          _id: "info-v",
          label: "LinkedIn",
          url: "https://www.linkedin.com/company/balloondekor-com/",
          image: {
            src: "/images/linkedin.webp",
            alt: "LinkedIn Logo"
          }
        }
        // {
        //   _id: "info-vi",
        //   label: "Pinterest",
        //   url: "/",
        //   image: {
        //     src: "/images/pinterest.webp",
        //     alt: "Pinterest Logo"
        //   }
        // }
      ]
    },
    {
      _id: "category-ii",
      title: "Payment Partners",
      infos: [
        {
          _id: "info-i",
          label: "UPI",
          url: "",
          image: {
            src: "/images/upi.webp",
            alt: "UPI Logo"
          }
        },
        {
          _id: "info-ii",
          label: "Visa",
          url: "",
          image: {
            src: "/images/visa.webp",
            alt: "Visa Logo"
          }
        },
        {
          _id: "info-iii",
          label: "Mastercard",
          url: "",
          image: {
            src: "/images/mastercard.webp",
            alt: "Mastercard Logo"
          }
        },
        {
          _id: "info-iv",
          label: "American Express",
          url: "",
          image: {
            src: "/images/american-express.webp",
            alt: "Twitter Logo"
          }
        }
      ]
    }
  ]
};

export default function Footer({
  footerLinkSections
}: {
  footerLinkSections: FooterLinkSectionDocument[];
}) {
  const path = usePathname();

  return (
    <footer
      className={`${path.includes("/cart") ? "hidden" : styles.container} `}
    >
      <div className={styles.wrapper}>
        <section
          className={styles.linksContainer}
        >
          {footerLinkSections.map(
            (linkSection) => (
              <LinkSection
                key={linkSection._id}
                footerLinkSection={linkSection}
              />
            )
          )}
        </section>
        <SocialSection
          socialSection={socialSection}
        />
      </div>
      <CopyrightSection />
    </footer>
  );
}
