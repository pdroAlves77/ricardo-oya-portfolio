import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ricardo Oya for retouching, post-production and creative collaborations.",
};

const INSTAGRAM_URL = "https://www.instagram.com/ricardooya.art";

export default function ContactPage() {
  return (
    <main className="pb-20 md:pb-28">
      <Container className="pt-6 md:pt-8">
        <BackLink href={ROUTES.home} label="Portfolio" />
      </Container>

      <Container>
        <section
          className="
            flex
            min-h-[calc(100svh-10rem)]
            flex-col
            justify-between
            pb-12
            pt-14
            md:min-h-[calc(100svh-12rem)]
            md:pb-16
            md:pt-20
          "
        >
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted md:text-sm">
              Contact
            </p>

            <h1
              className="
                mt-7
                max-w-[10ch]
                text-[clamp(4rem,14vw,7rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
                sm:text-[clamp(5rem,12vw,9rem)]
                lg:text-[clamp(6rem,9vw,10rem)]
              "
            >
              Let&apos;s work together.
            </h1>
          </div>

          <div
            className="
              mt-20
              grid
              gap-10
              border-t
              border-border
              pt-10
              md:grid-cols-[minmax(0,1fr)_26rem]
              md:items-end
              md:pt-12
            "
          >
            <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl md:leading-9">
              Available for retouching, post-production, commercial projects
              and creative collaborations.
            </p>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
                Get in touch
              </p>

              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  mt-5
                  flex
                  items-center
                  justify-between
                  gap-8
                  border-b
                  border-foreground
                  pb-4
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  sm:text-2xl
                "
              >
                @ricardooya.art

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
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}