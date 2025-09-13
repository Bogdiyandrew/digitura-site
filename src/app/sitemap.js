// app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://digitura.ro';

  // Lista paginilor tale
  const pages = [
    '/',
    '/politica-cookies',
    '/politica-de-confidentialitate',
    '/termeni',
    '/ai',
  ];

  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '/' ? 1 : 0.8,
  }));

  return [
    ...pageUrls,
    // Aici poți adăuga și alte pagini pe viitor, dacă vei avea
  ];
}