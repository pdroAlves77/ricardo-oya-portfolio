export const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
  studio: "/studio",
} as const;

export function getProjectRoute(slug: string) {
  return `/work/${slug}`;
}