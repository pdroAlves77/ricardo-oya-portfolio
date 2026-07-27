import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/lib/site";

import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container
      as="footer"
      className="
        grid
        gap-7
        border-t
        border-border
        py-8
        text-xs
        uppercase
        tracking-[0.14em]
        text-muted
        sm:grid-cols-3
        sm:items-center
        sm:gap-8
        sm:tracking-[0.16em]
      "
    >
      <p>© {currentYear} Ricardo Oya</p>

      <nav
        aria-label="Footer navigation"
        className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-center"
      >
        <Link
          href={ROUTES.about}
          className="
            py-1
            transition-colors
            duration-300
            hover:text-foreground
            focus-visible:rounded-sm
            focus-visible:text-foreground
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-foreground
          "
        >
          About
        </Link>

        <Link
          href={ROUTES.contact}
          className="
            py-1
            transition-colors
            duration-300
            hover:text-foreground
            focus-visible:rounded-sm
            focus-visible:text-foreground
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-foreground
          "
        >
          Contact
        </Link>
      </nav>

      <a
        href={SITE_CONFIG.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ricardo Oya on Instagram, opens in a new tab"
        className="
          w-fit
          py-1
          transition-colors
          duration-300
          hover:text-foreground
          focus-visible:rounded-sm
          focus-visible:text-foreground
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-foreground
          sm:justify-self-end
        "
      >
        Instagram
        <span aria-hidden="true"> ↗</span>
      </a>
    </Container>
  );
}