import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  number: string;
  title: string;
  meta?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeader({
  number,
  title,
  meta,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        `
          grid
          gap-5
          border-b
          border-border
          pb-6
          sm:grid-cols-[auto_minmax(0,1fr)_auto]
          sm:items-end
          md:pb-8
        `,
        className,
      )}
    >
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted md:text-base">
        {number}
      </p>

      <div className="flex min-w-0 items-center gap-5">
        <span
          aria-hidden="true"
          className="hidden h-px w-12 shrink-0 bg-border sm:block"
        />

        <h2
          id={id}
          className="
            text-2xl
            font-medium
            uppercase
            tracking-[0.1em]
            sm:text-xl
            sm:tracking-[0.12em]
            md:text-2xl
          "
        >
          {title}
        </h2>
      </div>

      {meta ? (
        <div className="text-xs uppercase tracking-[0.17em] text-muted sm:text-right md:text-sm">
          {meta}
        </div>
      ) : (
        <span aria-hidden="true" />
      )}
    </div>
  );
}