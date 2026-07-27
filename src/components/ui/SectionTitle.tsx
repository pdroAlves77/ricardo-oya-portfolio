import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
};

export function SectionTitle({
  children,
  className,
  as: Component = "h2",
  ...props
}: SectionTitleProps) {
  return (
    <Component
      className={cn(
        "text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}