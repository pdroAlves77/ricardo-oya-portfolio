import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ricardo Oya is a creative retoucher with over seven years of experience in high-end image editing and post-production.",
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
        <BackLink href={ROUTES.home} label="Portfolio" />
      </Container>

      <Container>
        <section className="pb-16 pt-14 md:pb-24 md:pt-20 lg:pt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-muted md:text-sm">
            About
          </p>

          <div className="mt-7 grid gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-end">
            <h1
              className="
                max-w-[9ch]
                text-[clamp(4rem,14vw,7rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
                sm:text-[clamp(5rem,12vw,9rem)]
                lg:text-[clamp(6rem,9vw,10rem)]
              "
            >
              Ricardo Oya
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted md:text-xl md:leading-9">
              Creative retoucher specializing in high-end image editing and
              visual post-production.
            </p>
          </div>
        </section>

        <section
          className="
            grid
            gap-12
            border-t
            border-border
            py-12
            md:grid-cols-[minmax(0,1fr)_30rem]
            md:py-16
          "
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
              Profile
            </p>

            <div className="mt-6 max-w-3xl space-y-6 text-base leading-8 text-muted md:text-lg md:leading-9">
              <p>
                Ricardo Oya is a creative retoucher with over seven years of
                experience working with leading studios in Brazil.
              </p>

              <p>
                He now works independently with international clients,
                delivering high-end retouching, image editing and
                post-production for automotive, advertising and commercial
                projects.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
              Specialties
            </p>

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
        </section>

        <section className="border-t border-border py-12 md:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
                Selected Work
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Explore the portfolio.
              </h2>
            </div>

            <Link
              href={ROUTES.home}
              className="
                group
                inline-flex
                items-center
                gap-4
                text-sm
                uppercase
                tracking-[0.16em]
              "
            >
              View work

              <span
                aria-hidden="true"
                className="
                  text-2xl
                  transition-transform
                  duration-300
                  ease-[var(--ease-portfolio)]
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}