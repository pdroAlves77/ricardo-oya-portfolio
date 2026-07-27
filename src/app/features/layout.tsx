import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE_CONFIG } from "@/lib/site";

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

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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

        <main
          id="main-content"
          className="flex-1"
          tabIndex={-1}
        >
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}