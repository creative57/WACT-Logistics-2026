import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE_URL = "https://wactlogisticsllc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/calculator`,        lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/contractors`,       lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/residential`,       lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/appointments`,      lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/services`,          lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/about`,             lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/faq`,               lastModified: new Date(), priority: 0.6 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url:          `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    priority:     0.8,
  }));

  return [...staticPages, ...productPages];
}
