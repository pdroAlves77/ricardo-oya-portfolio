import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioProject } from "@/types/project";

type NavigationProject = Pick<
  PortfolioProject,
  | "_id"
  | "title"
  | "slug"
  | "category"
  | "year"
  | "coverImage"
>;

type ProjectNavigationProps = {
  previousProject?: NavigationProject | null;
  nextProject?: NavigationProject | null;
};

type NavigationCardProps = {
  project: NavigationProject;
  direction: "previous" | "next";
};

function NavigationArrow({
  direction,
}: {
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        `
          h-5
          w-5
          shrink-0
          transition-transform
          duration-300
          ease-[var(--ease-portfolio)]
        `,
        isPrevious
          ? "group-hover:-translate-x-1"
          : "group-hover:translate-x-1",
      )}
    >
      <path
        d={
          isPrevious
            ? "M19 12H5m6-6-6 6 6 6"
            : "M5 12h14m-6-6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavigationCard({
  project,
  direction,
}: NavigationCardProps) {
  const isPrevious = direction === "previous";

  const imageUrl = urlFor(project.coverImage)
    .width(1400)
    .height(900)
    .quality(88)
    .fit("crop")
    .auto("format")
    .url();

  const navigationLabel = isPrevious
    ? `Previous project: ${project.title}`
    : `Next project: ${project.title}`;

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={navigationLabel}
      className={cn(
        `
          group
          block
          border-t
          border-border
          pt-5
          md:pt-6
        `,
        isPrevious ? "text-left" : "text-right",
      )}
    >
      <div
        className={cn(
          `
            mb-5
            flex
            items-center
            gap-3
            text-[0.65rem]
            font-medium
            uppercase
            tracking-[0.18em]
            text-muted
          `,
          !isPrevious && "justify-end",
        )}
      >
        {isPrevious && (
          <NavigationArrow direction="previous" />
        )}

        <span>
          {isPrevious
            ? "Previous project"
            : "Next project"}
        </span>

        {!isPrevious && (
          <NavigationArrow direction="next" />
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-border">
        <Image
          src={imageUrl}
          alt={
            project.coverImage.alt ||
            `Cover image for ${project.title}`
          }
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="
            object-cover
            transition-transform
            duration-700
            ease-[var(--ease-portfolio)]
            group-hover:scale-[1.025]
          "
        />
      </div>

      <div
        className={cn(
          `
            mt-5
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-start
            sm:justify-between
            sm:gap-5
          `,
          !isPrevious &&
            "items-end text-right sm:flex-row-reverse",
        )}
      >
        <h2 className="max-w-[16ch] text-2xl font-medium leading-none tracking-[-0.045em] sm:text-3xl">
          {project.title}
        </h2>

        <p
          className="
            max-w-full
            text-[0.65rem]
            uppercase
            leading-5
            tracking-[0.16em]
            text-muted
            sm:max-w-[18rem]
          "
        >
          {project.category} · {project.year}
        </p>
      </div>
    </Link>
  );
}

export function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <nav
      aria-label="Project navigation"
      className={cn(
        "grid gap-12 md:gap-6",
        previousProject &&
          nextProject &&
          "md:grid-cols-2",
      )}
    >
      {previousProject && (
        <NavigationCard
          project={previousProject}
          direction="previous"
        />
      )}

      {nextProject && (
        <NavigationCard
          project={nextProject}
          direction="next"
        />
      )}
    </nav>
  );
}