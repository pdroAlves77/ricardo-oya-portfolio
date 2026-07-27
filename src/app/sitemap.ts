import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/queries/projects";
import type { PortfolioProject } from "@/types/project";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects =
    await client.fetch<PortfolioProject[]>(PROJECTS_QUERY);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map(
    (project) => ({
      url: `${SITE_CONFIG.url}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: project.featured ? 0.9 : 0.8,
    }),
  );

  return [...staticPages, ...projectPages];
}