export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahefa.vercel.app";
  const pages = ['', 'about', 'contact', 'projects'];
  
  const entries = [];

  for (const page of pages) {
    // Default locale (en) - no prefix since localePrefix: 'as-needed'
    entries.push({
      url: `${baseUrl}${page ? `/${page}` : ''}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    });

    // French locale (fr) - with prefix
    entries.push({
      url: `${baseUrl}/fr${page ? `/${page}` : ''}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: page === '' ? 0.9 : 0.7,
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${entries.map((entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `).join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}