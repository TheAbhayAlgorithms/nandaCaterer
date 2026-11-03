import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://nandacaterer.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
