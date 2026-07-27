import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className, ...props }: DividerProps) {
  return (
    <hr
      className={cn("h-px w-full border-0 bg-border", className)}
      {...props}
    />
  );
}