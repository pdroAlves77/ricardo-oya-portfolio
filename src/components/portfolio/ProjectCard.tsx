import Image from "next/image";
import Link from "next/link";

import { getProjectRoute } from "@/constants/routes";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioProject } from "@/types/project";

type ProjectCardProps = {
  project: PortfolioProject;
  priority?: boolean;
  variant?: "default" | "featured";
};

export function ProjectCard({
  project,
  priority = false,
  variant = "default",
}: ProjectCardProps) {
  const isFeatured = variant === "featured";

  const imageUrl = urlFor(project.coverImage)
    .width(isFeatured ? 2800 : 1600)
    .quality(isFeatured ? 92 : 88)
    .fit("max")
    .auto("format")
    .url();

  const projectDetails = [
    project.client,
    project.category,
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group">
      <Link
        href={getProjectRoute(project.slug)}
        aria-label={`View project ${project.title}`}
        className="block"
      >
        <div
          className={`
            relative
            overflow-hidden
            bg-border
            ${
              isFeatured
                ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/8.5]"
                : "aspect-[4/5]"
            }
          `}
        >
          <Image
            src={imageUrl}
            alt={
              project.coverImage.alt ||
              `Cover image for ${project.title}`
            }
            fill
            priority={priority}
            sizes={
              isFeatured
                ? "100vw"
                : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            }
            className="
              object-cover
              transition-transform
              duration-700
              ease-[var(--ease-portfolio)]
              group-hover:scale-[1.018]
            "
          />

          {isFeatured && (
            <>
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[55%]
                  bg-gradient-to-t
                  from-black/75
                  via-black/25
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  flex
                  items-end
                  justify-between
                  gap-8
                  px-5
                  pb-5
                  sm:px-7
                  sm:pb-7
                  md:px-10
                  md:pb-9
                  lg:px-12
                  lg:pb-11
                "
              >
                <div className="min-w-0 text-white">
                  <p
                    className="
                      text-[0.72rem]
                      uppercase
                      tracking-[0.2em]
                      text-white/80
                      sm:text-xs
                      md:text-sm
                    "
                  >
                    {project.category}
                  </p>

                  <h3
                    className="
                      mt-3
                      max-w-[13ch]
                      text-[clamp(2.75rem,6vw,6.5rem)]
                      font-medium
                      leading-[0.84]
                      tracking-[-0.065em]
                      text-white
                    "
                  >
                    {project.title}
                  </h3>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    mb-1
                    shrink-0
                    text-3xl
                    leading-none
                    text-white
                    transition-transform
                    duration-300
                    ease-[var(--ease-portfolio)]
                    group-hover:translate-x-2
                    sm:text-4xl
                  "
                >
                  →
                </span>
              </div>
            </>
          )}
        </div>

        {isFeatured ? (
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
            {projectDetails && (
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.16em]
                  text-muted
                  md:text-sm
                "
              >
                {projectDetails}
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

              <span
                aria-hidden="true"
                className="
                  text-2xl
                  leading-none
                  transition-transform
                  duration-300
                  ease-[var(--ease-portfolio)]
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </div>
          </div>
        ) : (
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
                {project.title}
              </h3>

              {projectDetails && (
                <p
                  className="
                    mt-3
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-muted
                  "
                >
                  {projectDetails}
                </p>
              )}
            </div>

            <span
              aria-hidden="true"
              className="
                mt-1
                shrink-0
                text-2xl
                leading-none
                transition-transform
                duration-300
                ease-[var(--ease-portfolio)]
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </div>
        )}
      </Link>
    </article>
  );
}