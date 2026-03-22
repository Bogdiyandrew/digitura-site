export default function sitemap() {
  const baseUrl = 'https://digitura.ro';

  const staticPages = [
    '/',
    '/portofoliu',
    '/audit-gratuit', // Am adăugat noua pagină aici
    '/politica-cookies',
    '/politica-de-confidentialitate',
    '/termeni',
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: page === '/' ? 1 : 0.8,
  }));

  return staticUrls;
}