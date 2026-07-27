import type { SanityImageSource } from "@sanity/image-url";

export type GalleryLayout =
  | "hero"
  | "full"
  | "contained"
  | "portrait"
  | "half"
  | "centered"
  | "portraitLeft"
  | "portraitRight";

export type ProjectCategory =
  | "Automotive"
  | "Lifestyle"
  | "Product"
  | "Portrait"
  | "Personal";

export type PortfolioImage = SanityImageSource & {
  _key?: string;
  alt?: string;
  layout?: GalleryLayout;
};

export type ProjectCredit = {
  _key: string;
  role: string;
  name: string;
};

export type ProjectBeforeAfter = {
  before?: PortfolioImage;
  after?: PortfolioImage;
};

export type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  year: number;
  client?: string;
  description?: string;
  services?: string[];
  credits?: ProjectCredit[];
  coverImage: PortfolioImage;
  gallery?: PortfolioImage[];
  beforeAfter?: ProjectBeforeAfter;
  featured?: boolean;
  order?: number;
};