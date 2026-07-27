import Link from "next/link";

import { ROUTES } from "@/constants/routes";

import { Container } from "./Container";

const currentYear = new Date().getFullYear();

const INSTAGRAM_URL =
  "https://www.instagram.com/ricardooya.art";

export function Footer() {
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
          "
        >
          Contact
        </Link>
      </nav>

      <Link
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ricardo Oya on Instagram, opens in a new tab"
        className="
          w-fit
          py-1
          transition-colors
          duration-300
          hover:text-foreground
          sm:justify-self-end
        "
      >
        Instagram
        <span aria-hidden="true"> ↗</span>
      </Link>
    </Container>
  );
}