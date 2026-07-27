import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SITE_CONFIG } from "@/lib/site";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    default: SITE_CONFIG.title,
    template: "%s | Ricardo Oya",
  },

  description: SITE_CONFIG.description,

  applicationName: SITE_CONFIG.name,

  authors: [
    {
      name: SITE_CONFIG.creator,
      url: SITE_CONFIG.url,
    },
  ],

  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.creator,

  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.language}>
      <body className={`${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}