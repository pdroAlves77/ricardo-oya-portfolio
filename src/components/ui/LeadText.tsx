import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type LeadTextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function LeadText({
  children,
  className,
  ...props
}: LeadTextProps) {
  return (
    <p
      className={cn(
        "text-lg leading-8 text-muted md:text-xl md:leading-9",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}