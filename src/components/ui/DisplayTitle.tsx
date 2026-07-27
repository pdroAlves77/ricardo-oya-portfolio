import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type DisplayTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "default" | "large";
};

export function DisplayTitle({
  children,
  as: Component = "h1",
  size = "default",
  className,
  ...props
}: DisplayTitleProps) {
  return (
    <Component
      className={cn(
        "font-medium leading-[0.8] tracking-[-0.075em]",
        size === "default" &&
          "max-w-[10ch] text-[clamp(4rem,14vw,7rem)] sm:text-[clamp(5rem,12vw,9rem)] lg:text-[clamp(6rem,9vw,10rem)]",
        size === "large" &&
          "max-w-[10ch] text-[clamp(4rem,15vw,7rem)] sm:text-[clamp(5rem,13vw,9rem)] lg:text-[clamp(6rem,10vw,11rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}