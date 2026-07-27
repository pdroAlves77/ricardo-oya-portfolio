import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The requested page could not be found in Ricardo Oya's portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center py-16 md:min-h-[calc(100svh-5rem)]">
      <Container>
        <Reveal>
          <section
            aria-labelledby="not-found-heading"
            className="
              grid
              gap-10
              border-y
              border-border
              py-12
              md:grid-cols-[8rem_minmax(0,1fr)]
              md:gap-16
              md:py-16
              lg:grid-cols-[12rem_minmax(0,1fr)]
              lg:py-20
            "
          >
            <div>
              <SectionLabel>404</SectionLabel>
            </div>

            <div>
              <h1
                id="not-found-heading"
                className="
                  max-w-[10ch]
                  text-[clamp(3.5rem,10vw,8rem)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.065em]
                "
              >
                Page not found.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                The page may have been removed, renamed or never
                existed.
              </p>

              <ArrowLink
                href={ROUTES.home}
                className="mt-10"
              >
                Return to portfolio
              </ArrowLink>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}