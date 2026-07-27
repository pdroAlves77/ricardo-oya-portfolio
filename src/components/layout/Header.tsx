import Link from "next/link";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";

import { Container } from "./Container";

export function Header() {
  return (
    <Container
      as="header"
      className="flex h-20 items-center justify-between md:h-24"
    >
      <Link
        href={ROUTES.home}
        className="text-sm font-medium uppercase tracking-[-0.02em] transition-opacity hover:opacity-60"
      >
        Ricardo Oya
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-5 sm:gap-7 md:gap-10">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs uppercase tracking-[0.14em] text-foreground transition-opacity hover:opacity-50"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}