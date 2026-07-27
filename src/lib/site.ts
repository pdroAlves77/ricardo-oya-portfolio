const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return normalizeUrl(configuredUrl);
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (vercelUrl) {
    return normalizeUrl(`https://${vercelUrl}`);
  }

  return FALLBACK_SITE_URL;
}

export function getAbsoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return new URL(
    normalizedPath,
    `${SITE_CONFIG.url}/`,
  ).toString();
}

export const SITE_CONFIG = {
  name: "Ricardo Oya",
  title: "Ricardo Oya — Creative Retoucher",
  description:
    "Portfolio of Ricardo Oya, a creative retoucher specializing in high-end automotive, lifestyle and commercial imagery.",
  url: getSiteUrl(),
  locale: "en_US",
  language: "en",
  creator: "Ricardo Oya",
  instagram:
    "https://www.instagram.com/ricardooya.art",
} as const;