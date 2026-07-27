import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BackLink } from "@/components/ui/BackLink";
import { Divider } from "@/components/ui/Divider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ROUTES } from "@/constants/routes";
import {
  getAbsoluteUrl,
  SITE_CONFIG,
} from "@/lib/site";

const pageDescription =
  "Ricardo Oya is a creative retoucher with over seven years of experience in high-end image editing and post-production.";

export const metadata: Metadata = {
  title: "About",
  description: pageDescription,

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "profile",
    locale: SITE_CONFIG.locale,
    url: getAbsoluteUrl("/about"),
    siteName: SITE_CONFIG.name,
    title: "About Ricardo Oya",
    description: pageDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: "About Ricardo Oya",
    description: pageDescription,
  },
};

const specialties = [
  "High-end Retouching",
  "Image Editing",
  "Post-production",
  "Automotive",
  "Advertising",
  "Commercial Imagery",
];

export default function AboutPage() {
  return (
    <main className="pb-20 md:pb-28">
      <Container className="pt-6 md:pt-8">
        <BackLink
          href={ROUTES.home}
          label="Portfolio"
        />
      </Container>

      <Container>
        <PageHero
          label="About"
          title="Ricardo Oya"
          description="Creative retoucher specializing in high-end image editing and visual post-production."
        />

        <Divider />

        <section className="grid gap-12 py-12 md:grid-cols-[minmax(0,1fr)_30rem] md:py-16">
          <Reveal>
            <div>
              <SectionLabel>Profile</SectionLabel>

              <div className="mt-6 max-w-3xl space-y-6 text-base leading-8 text-muted md:text-lg md:leading-9">
                <p>
                  Hi, I'm Ricardo Oya - Creative Retoucher specializing in high-end retouching and image editing.
                </p>

                <p>
                  I have over 7 years of experience working 
                  with top studios in Brazil, and I now 
                  freelance for international clients.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <SectionLabel>Specialties</SectionLabel>

              <ul className="mt-6 divide-y divide-border border-t border-border">
                {specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="py-4 text-sm uppercase tracking-[0.12em]"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <Divider />

        <Reveal>
          <section className="py-12 md:py-16">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>
                  Selected Work
                </SectionLabel>

                <SectionTitle className="mt-4">
                  Explore the portfolio.
                </SectionTitle>
              </div>

              <ArrowLink href={ROUTES.home}>
                View work
              </ArrowLink>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}