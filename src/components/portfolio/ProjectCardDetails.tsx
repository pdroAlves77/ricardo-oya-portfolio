import { cn } from "@/lib/cn";

type ProjectCardDetailsProps = {
  title: string;
  details?: string;
  featured?: boolean;
};

export function ProjectCardDetails({
  title,
  details,
  featured = false,
}: ProjectCardDetailsProps) {
  if (featured) {
    return (
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-border
          pb-7
          pt-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          md:pb-8
          md:pt-6
        "
      >
        {details && (
          <p
            className="
              text-xs
              uppercase
              tracking-[0.16em]
              text-muted
              md:text-sm
            "
          >
            {details}
          </p>
        )}

        <div className="flex items-center gap-4">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.17em]
              text-muted
              md:text-sm
            "
          >
            View project
          </p>

          <Arrow featured />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-start justify-between gap-8">
      <div>
        <h3
          className="
            text-xl
            font-medium
            leading-tight
            tracking-[-0.035em]
            md:text-2xl
          "
        >
          {title}
        </h3>

        {details && (
          <p
            className="
              mt-3
              text-xs
              uppercase
              tracking-[0.15em]
              text-muted
            "
          >
            {details}
          </p>
        )}
      </div>

      <Arrow className="mt-1 shrink-0" />
    </div>
  );
}

type ArrowProps = {
  featured?: boolean;
  className?: string;
};

function Arrow({
  featured = false,
  className,
}: ArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-2xl leading-none transition-transform duration-300 ease-[var(--ease-portfolio)] group-hover:translate-x-1",
        featured && "shrink-0",
        className,
      )}
    >
      →
    </span>
  );
}