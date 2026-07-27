import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BackLink } from "@/components/ui/BackLink";
import { Divider } from "@/components/ui/Divider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ROUTES } from "@/constants/routes";
import {
  getAbsoluteUrl,
  SITE_CONFIG,
} from "@/lib/site";

const pageDescription =
  "Contact Ricardo Oya for retouching, post-production and creative collaborations.";

export const metadata: Metadata = {
  title: "Contact",
  description: pageDescription,

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: getAbsoluteUrl("/contact"),
    siteName: SITE_CONFIG.name,
    title: "Contact Ricardo Oya",
    description: pageDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Ricardo Oya",
    description: pageDescription,
  },
};

export default function ContactPage() {
  return (
    <main className="pb-20 md:pb-28">
      <Container className="pt-6 md:pt-8">
        <BackLink
          href={ROUTES.home}
          label="Portfolio"
        />
      </Container>

      <Container>
        <div className="flex min-h-[calc(100svh-10rem)] flex-col md:min-h-[calc(100svh-12rem)]">
          <PageHero
            label="Contact"
            title="Let's work together."
            className="pb-16"
            contentClassName="lg:block"
          />

          <div className="mt-auto">
            <Divider />

            <Reveal>
              <section
                className="
                  grid
                  gap-10
                  pb-12
                  pt-10
                  md:grid-cols-[minmax(0,1fr)_26rem]
                  md:items-end
                  md:pb-16
                  md:pt-12
                "
              >
                <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl md:leading-9">
                  Available for retouching,
                  post-production, commercial projects and
                  creative collaborations.
                </p>

                <div>
                  <SectionLabel>
                    Get in touch
                  </SectionLabel>

                  <ArrowLink
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Ricardo Oya on Instagram, opens in a new tab"
                    direction="up-right"
                    className="
                      mt-5
                      flex
                      w-full
                      justify-between
                      gap-8
                      border-b
                      border-foreground
                      pb-4
                      text-xl
                      font-medium
                      normal-case
                      tracking-[-0.03em]
                      sm:text-2xl
                    "
                  >
                    @ricardooya.art
                  </ArrowLink>
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </Container>
    </main>
  );
}