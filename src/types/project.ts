import type { SanityImageSource } from "@sanity/image-url";

export type GalleryLayout =
  | "full"
  | "centered"
  | "portraitLeft"
  | "portraitRight"
  | "half";

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

export type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  client?: string;
  description?: string;
  services?: string[];
  credits?: ProjectCredit[];
  coverImage: PortfolioImage;
  gallery?: PortfolioImage[];

  beforeAfter?: {
    before?: PortfolioImage;
    after?: PortfolioImage;
  };

  featured?: boolean;
  order?: number;
};