import { prompts } from '@/lib/prompts';

export default function sitemap() {
  const baseUrl = 'https://digitura.ro';

  const staticPages = [
    '/',
    '/portofoliu',
    '/ai',
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

  const promptUrls = prompts.map((prompt) => ({
    url: `${baseUrl}/ai/prompt/${encodeURIComponent(prompt.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticUrls, ...promptUrls];
}