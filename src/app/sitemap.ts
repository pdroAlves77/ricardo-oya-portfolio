import type { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";

import { getAbsoluteUrl } from "@/lib/site";
import { client } from "@/sanity/lib/client";

type SitemapProject = {
  slug: string;
  updatedAt: string;
};

const SITEMAP_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    defined(coverImage.asset)
  ] | order(
    coalesce(order, 9999) asc,
    year desc,
    title asc
  ) {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }
`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<SitemapProject[]>(
    SITEMAP_PROJECTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["projects", "sitemap"],
      },
    },
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/about"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/contact"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap =
    projects.map((project) => ({
      url: getAbsoluteUrl(`/work/${project.slug}`),
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...projectRoutes];
}