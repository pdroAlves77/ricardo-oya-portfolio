import { ROUTES } from "./routes";

export const NAVIGATION_ITEMS = [
  {
    label: "Work",
    href: ROUTES.work,
  },
  {
    label: "About",
    href: ROUTES.about,
  },
  {
    label: "Contact",
    href: ROUTES.contact,
  },
] as const;