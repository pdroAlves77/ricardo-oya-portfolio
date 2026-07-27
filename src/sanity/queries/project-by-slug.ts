import { defineQuery } from "next-sanity";

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    client,
    description,
    services,

    credits[] {
      _key,
      role,
      name
    },

    coverImage {
      asset,
      alt,
      crop,
      hotspot
    },

    gallery[] {
      _key,
      asset,
      alt,
      layout,
      crop,
      hotspot
    },

    beforeAfter {
      before {
        asset,
        alt,
        crop,
        hotspot
      },

      after {
        asset,
        alt,
        crop,
        hotspot
      }
    },

    featured,
    order
  }
`);