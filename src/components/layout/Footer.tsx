import Link from "next/link";

import { ROUTES } from "@/constants/routes";

import { Container } from "./Container";

const currentYear = new Date().getFullYear();

const INSTAGRAM_URL = "https://www.instagram.com/ricardooya.art";

export function Footer() {
  return (
    <Container
      as="footer"
      className="
        grid
        gap-8
        border-t
        border-border
        py-8
        text-xs
        uppercase
        tracking-[0.16em]
        text-muted
        sm:grid-cols-3
        sm:items-center
      "
    >
      <p>© {currentYear} Ricardo Oya</p>

      <nav
        aria-label="Footer navigation"
        className="flex gap-6 sm:justify-center"
      >
        <Link
          href={ROUTES.about}
          className="transition-colors duration-300 hover:text-foreground"
        >
          About
        </Link>

        <Link
          href={ROUTES.contact}
          className="transition-colors duration-300 hover:text-foreground"
        >
          Contact
        </Link>
      </nav>

      <Link
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="
          transition-colors
          duration-300
          hover:text-foreground
          sm:justify-self-end
        "
      >
        Instagram ↗
      </Link>
    </Container>
  );
}