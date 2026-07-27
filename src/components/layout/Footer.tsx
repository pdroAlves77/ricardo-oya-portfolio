import Link from "next/link";

import { Container } from "./Container";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <Container
      as="footer"
      className="flex flex-col gap-4 border-t border-border py-8 text-xs uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between"
    >
      <p>© {currentYear} Ricardo Oya</p>

      <Link
        href="https://www.instagram.com/ricardooya.art"
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-foreground"
      >
        Instagram
      </Link>
    </Container>
  );
}