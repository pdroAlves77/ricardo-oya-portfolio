import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  jobTitle: "Creative Retoucher",
  description: SITE_CONFIG.description,
  sameAs: [SITE_CONFIG.instagram],
  knowsAbout: [
    "High-end retouching",
    "Image editing",
    "Post-production",
    "Automotive imagery",
    "Lifestyle imagery",
    "Commercial imagery",
  ],
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.language}>
      <body className={`${geist.variable} antialiased`}>
        <a
          href="#main-content"
          className="
            fixed
            left-4
            top-4
            z-[100]
            -translate-y-24
            bg-foreground
            px-4
            py-3
            text-xs
            font-medium
            uppercase
            tracking-[0.14em]
            text-background
            transition-transform
            focus:translate-y-0
          "
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(personJsonLd),
          }}
        />

        <div className="flex min-h-screen flex-col">
          <Header />

          <div
            id="main-content"
            className="flex-1"
            tabIndex={-1}
          >
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}