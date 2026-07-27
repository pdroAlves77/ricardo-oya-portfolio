"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";

import { Container } from "./Container";

function isCurrentRoute(
  pathname: string,
  href: string,
) {
  if (href === ROUTES.home) {
    return (
      pathname === ROUTES.home ||
      pathname.startsWith("/work/")
    );
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <Container
      as="header"
      className="
        flex
        min-h-16
        items-center
        justify-between
        gap-5
        py-4
        md:min-h-20
      "
    >
      <Link
        href={ROUTES.home}
        aria-label="Ricardo Oya, portfolio home"
        className="
          shrink-0
          text-xs
          font-medium
          uppercase
          tracking-[-0.01em]
          transition-opacity
          duration-300
          ease-[var(--ease-portfolio)]
          hover:opacity-50
          focus-visible:rounded-sm
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-foreground
        "
      >
        Ricardo Oya
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-4 xs:gap-5 sm:gap-7 md:gap-9">
          {NAVIGATION_ITEMS.map((item) => {
            const isCurrent = isCurrentRoute(
              pathname,
              item.href,
            );

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    isCurrent ? "page" : undefined
                  }
                  className={cn(
                    `
                      relative
                      block
                      py-2
                      text-[0.64rem]
                      uppercase
                      tracking-[0.14em]
                      transition-opacity
                      duration-300
                      ease-[var(--ease-portfolio)]
                      hover:opacity-50
                      focus-visible:rounded-sm
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-foreground
                      xs:text-[0.68rem]
                      xs:tracking-[0.16em]
                    `,
                    isCurrent &&
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Container>
  );
}