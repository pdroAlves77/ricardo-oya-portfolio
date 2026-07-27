import Link from "next/link";

type BackLinkProps = {
  href: string;
  label?: string;
};

export function BackLink({
  href,
  label = "Home",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={`Back to ${label}`}
      className="
        group
        inline-flex
        min-h-11
        items-center
        gap-3
        text-xs
        uppercase
        tracking-[0.18em]
        text-muted
        transition-colors
        duration-300
        ease-[var(--ease-portfolio)]
        hover:text-foreground
      "
    >
      <span
        aria-hidden="true"
        className="
          text-xl
          leading-none
          transition-transform
          duration-300
          ease-[var(--ease-portfolio)]
          group-hover:-translate-x-1
        "
      >
        ←
      </span>

      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}