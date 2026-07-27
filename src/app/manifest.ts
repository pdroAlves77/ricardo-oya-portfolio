import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.title,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f2f1ec",
    theme_color: "#f2f1ec",
  };
}