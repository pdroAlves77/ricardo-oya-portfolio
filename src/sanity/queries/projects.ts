import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current)
  ] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    client,
    description,
    coverImage {
      asset,
      alt,
      crop,
      hotspot
    },
    featured,
    order
  }
`);