// app/sitemap.js

// Importă lista de prompturi folosind calea corectă (alias)
import { prompts } from '@/lib/prompts'; // <-- AICI A FOST GREȘEALA, ACUM E CORECT

export default function sitemap() {
  const baseUrl = 'https://digitura.ro';

  // 1. Paginile statice
  const staticPages = [
    '/',
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

  // 2. Paginile dinamice pentru fiecare prompt
  const promptUrls = prompts.map((prompt) => ({
    url: `${baseUrl}/ai/prompt/${encodeURIComponent(prompt.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Combină cele două liste
  return [...staticUrls, ...promptUrls];
}