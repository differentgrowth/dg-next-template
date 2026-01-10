import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";

/**
 * Sitemap configuration
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Add your routes here. For dynamic routes, fetch from your database/CMS.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.URL;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic routes example (uncomment and modify as needed):
  // const posts = await getPosts();
  // const dynamicRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [...staticRoutes];
}
