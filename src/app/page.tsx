import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100svh-5rem)] flex-col justify-between py-10 md:min-h-[calc(100svh-6rem)] md:py-14">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Digital Retoucher
          </p>

          <p className="hidden text-xs uppercase tracking-[0.18em] text-muted sm:block">
            Rio de Janeiro · Brazil
          </p>
        </div>

        <div className="py-20">
          <h1 className="max-w-[12ch] text-[clamp(4rem,13vw,12rem)] font-medium leading-[0.82] tracking-[-0.075em]">
            Ricardo Oya
          </h1>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            High-end retouching, compositing and visual finishing for
            automotive, adversiting, editorial beauty and fashion.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <Link
            href={ROUTES.work}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]"
          >
            Selected work

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <p className="hidden max-w-52 text-right text-xs leading-relaxed text-muted md:block">
            Available for freelance projects and creative collaborations.
          </p>
        </div>
      </Container>
    </main>
  );
}