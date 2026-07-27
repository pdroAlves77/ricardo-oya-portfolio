import Link from "next/link";

import { getProjectRoute } from "@/constants/routes";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioProject } from "@/types/project";

import { ProjectCardDetails } from "./ProjectCardDetails";
import { ProjectCardMedia } from "./ProjectCardMedia";

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
    .width(isFeatured ? 2400 : 1200)
    .quality(isFeatured ? 86 : 82)
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
        <ProjectCardMedia
          project={project}
          imageUrl={imageUrl}
          featured={isFeatured}
          priority={priority}
        />

        <ProjectCardDetails
          title={project.title}
          details={projectDetails}
          featured={isFeatured}
        />
      </Link>
    </article>
  );
}