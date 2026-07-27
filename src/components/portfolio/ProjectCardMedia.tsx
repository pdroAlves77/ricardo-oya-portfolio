import Image from "next/image";

import { cn } from "@/lib/cn";
import type { PortfolioProject } from "@/types/project";

type ProjectCardMediaProps = {
  project: PortfolioProject;
  imageUrl: string;
  featured?: boolean;
  priority?: boolean;
};

export function ProjectCardMedia({
  project,
  imageUrl,
  featured = false,
  priority = false,
}: ProjectCardMediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-border",
        featured
          ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/8.5]"
          : "aspect-[4/5]",
      )}
    >
      <Image
        src={imageUrl}
        alt={
          project.coverImage.alt ||
          `Cover image for ${project.title}`
        }
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={featured ? 86 : 82}
        sizes={
          featured
            ? "(max-width: 1920px) 100vw, 1920px"
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

      {featured && (
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
  );
}