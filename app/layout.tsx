// libraries
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

// hooks
import { StatusContextProvider } from "@/hooks/useStatusContext";

// styles
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { ScreenContextProvider } from "@/hooks/useScreenContext";

// font
const outfit = Outfit({
  preload: true,
  fallback: ["sans-serif"],
  subsets: ["latin"]
});

// meta
export const metadata: Metadata = {
  title: "Balloondekor",
  description: "description placeholder"
};

// layout
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={outfit.className}>
        <ScreenContextProvider>
          <StatusContextProvider>
            {children}
            <Toaster />
          </StatusContextProvider>
        </ScreenContextProvider>
      </body>
    </html>
  );
}
