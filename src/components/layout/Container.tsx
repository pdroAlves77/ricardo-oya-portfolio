import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-[1800px] px-5 md:px-8 xl:px-12 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}