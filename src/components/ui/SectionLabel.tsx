import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionLabelProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function SectionLabel({
  children,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.2em] text-muted md:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}