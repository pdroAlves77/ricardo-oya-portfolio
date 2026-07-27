import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  direction?: "right" | "up-right";
};

export function ArrowLink({
  children,
  className,
  direction = "right",
  ...props
}: ArrowLinkProps) {
  const arrow = direction === "up-right" ? "↗" : "→";

  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-4 text-sm uppercase tracking-[0.16em]",
        className,
      )}
      {...props}
    >
      <span>{children}</span>

      <span
        aria-hidden="true"
        className={cn(
          "text-2xl leading-none transition-transform duration-300 ease-[var(--ease-portfolio)]",
          direction === "right" && "group-hover:translate-x-1",
          direction === "up-right" &&
            "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        )}
      >
        {arrow}
      </span>
    </Link>
  );
}