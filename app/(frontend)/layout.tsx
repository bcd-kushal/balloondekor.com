import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { CityContextProvider } from "@/hooks/useCityContext";
import { CustomerContextProvider } from "@/hooks/useCustomerContext";

import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import Popup from "@/components/frontend/Popup";

// =================================================================================================
// SEO area ----------------------------------------------------------------------------------------
import { DOMAIN } from "@/constants/frontend/apiRoute";
import CartIndexingEvents from "@/components/ui/transaction/_foreign/CartIndexingEvents";
import BottomStickyNavBar from "@/components/frontend/BottomStickyNavBar/BottomStickyNavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import StickyCallButtons from "@/components/frontend/StickyCallButtons/StickyCallButtons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { SettingsContextProvider } from "@/hooks/useSettingsContext";

// env variables
const GOOGLE_CLIENT_ID: string | undefined =
  process.env
    .NEXT_PUBLIC_BALLOONDEKOR_GOOGLE_CLIENT_ID;

export const websiteURL =
  "https://www.balloondekor.com";
export const websiteTitle =
  "Balloon Decoration India  | Birthday Party & Event Decorators";
export const websiteDescription =
  "We offer best Balloon Decoration for Birthday, Anniversary, Kids Party at Home all over India at Affordable Rates";
export const websiteKeywords = [
  "Gifts",
  "Flowers",
  "Decoration",
  "Balloons",
  "Florist Near me",
  "Online flower delivery",
  "buy flowers online",
  "Flower delivery website",
  "Florist",
  "buy cakes online",
  "Balloon decoration",
  "birthday decoration",
  "Balloon decorator",
  "decoration service",
  "birthday decoration services",
  "event planner",
  "event planning"
];

export const metadata: Metadata = {
  title: websiteTitle,
  description: websiteDescription,
  keywords: websiteKeywords,
  twitter: {
    title: websiteTitle,
    description: websiteDescription,
    site: DOMAIN
  },
  openGraph: {
    title: websiteTitle,
    description: websiteDescription,
    url: DOMAIN,
    siteName: DOMAIN,
    type: "website",
    countryName: "India"
  },
  referrer: "origin-when-cross-origin",
  category: "E-commerce website",
  classification: "website",
  alternates: {
    canonical: new URL(DOMAIN || websiteURL)
  },
  metadataBase: new URL(DOMAIN || websiteURL)
};
// =================================================================================================
// =================================================================================================

export default function FrontendLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className=""
        asChild
      >
        <SettingsContextProvider>
          <div className="relative left-[50%] w-full max-w-[1200px] min-h-[100dvh] translate-x-[-50%]">
            <GoogleAnalytics gaId="G-4N2HN0KJ1T" />
            <CityContextProvider>
              <GoogleOAuthProvider
                clientId={
                  GOOGLE_CLIENT_ID as string
                }
              >
                <CustomerContextProvider>
                  <Header />
                  {children}
                  <Footer />
                  <Suspense fallback={null}>
                    <CartIndexingEvents />
                  </Suspense>
                  <Popup />
                  <BottomStickyNavBar />
                </CustomerContextProvider>
              </GoogleOAuthProvider>
            </CityContextProvider>
          </div>
        </SettingsContextProvider>
      </ContextMenuTrigger>
      <ContextMenuContent className="hidden bg-transparent border-none p-0 h-0 w-0" />
    </ContextMenu>
  );
}
