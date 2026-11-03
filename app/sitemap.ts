import { MetadataRoute } from "next";
import { menuCategories } from "@/data/menu";
import { detailedServices } from "@/data/services";
import { serviceAreasData } from "@/data/service-areas";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://nandacaterer.com";

  const staticRoutes = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/connect", priority: 0.9, freq: "weekly" as const },
    { path: "/packages", priority: 0.9, freq: "weekly" as const },
    { path: "/quote", priority: 0.9, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "weekly" as const },
    { path: "/menu", priority: 0.9, freq: "weekly" as const },
    { path: "/gallery", priority: 0.8, freq: "monthly" as const },
    { path: "/testimonials", priority: 0.8, freq: "monthly" as const },
    { path: "/service-areas", priority: 0.8, freq: "monthly" as const },
    { path: "/faq", priority: 0.8, freq: "monthly" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
    { path: "/privacy", priority: 0.4, freq: "yearly" as const },
    { path: "/terms", priority: 0.4, freq: "yearly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const serviceRoutes = detailedServices.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const menuRoutes = menuCategories.map((cat) => ({
    url: `${baseUrl}/menu/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const areaRoutes = serviceAreasData.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogArticleRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...menuRoutes,
    ...areaRoutes,
    ...blogArticleRoutes,
  ];
}
