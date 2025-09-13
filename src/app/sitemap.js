// app/sitemap.js

// Importă lista de prompturi din sursa ta de date
import { prompts } from '../src/lib/prompts'; 

export default function sitemap() {
  const baseUrl = 'https://digitura.ro';

  // 1. Paginile statice (cele pe care le aveai deja)
  const staticPages = [
    '/',
    '/ai', // Am adăugat și pagina principală de AI
    '/politica-cookies',
    '/politica-de-confidentialitate',
    '/termeni',
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '/' ? 1 : 0.8,
  }));

  // 2. Paginile dinamice pentru fiecare prompt
  const promptUrls = prompts.map((prompt) => ({
    url: `${baseUrl}/ai/prompt/${prompt.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // Produsele se pot schimba, deci verificăm mai des
    priority: 0.7, // Prioritate puțin mai mică decât paginile principale
  }));

  // 3. Combină cele două liste și returnează rezultatul
  return [...staticUrls, ...promptUrls];
}