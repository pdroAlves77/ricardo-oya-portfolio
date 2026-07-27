import Link from "next/link";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";

import { Container } from "./Container";

export function Header() {
  return (
    <Container
      as="header"
      className="flex h-16 items-center justify-between md:h-20"
    >
      <Link
        href={ROUTES.home}
        className="
          text-xs
          font-medium
          uppercase
          tracking-[-0.01em]
          transition-opacity
          duration-300
          ease-[var(--ease-portfolio)]
          hover:opacity-50
        "
      >
        Ricardo Oya
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-5 sm:gap-7 md:gap-9">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  text-[0.68rem]
                  uppercase
                  tracking-[0.16em]
                  transition-opacity
                  duration-300
                  ease-[var(--ease-portfolio)]
                  hover:opacity-50
                "
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