import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    defined(coverImage.asset)
  ] | order(
    coalesce(order, 9999) asc,
    year desc,
    title asc
  ) {
    _id,
    title,
    "slug": slug.current,

    "category": select(
      category == "automotive" => "Automotive",
      category == "lifestyle" => "Lifestyle",
      category == "product" => "Product",
      category == "portrait" => "Portrait",
      category == "personal" => "Personal",
      "Personal"
    ),

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