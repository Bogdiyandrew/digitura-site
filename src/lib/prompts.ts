// src/lib/prompts.ts

export interface Prompt {
  id: number; // ID-ul numeric pe care îl vei folosi pe social media
  slug: string;
  title: string;
  prompt: string;
  imageUrl: string; // Aceasta va fi imaginea "After"
  beforeImageUrl?: string; // Imaginea "Before" (opțională)
  videoUrl?: string;
  tags: string[];
  type: 'image' | 'video';
}

export const prompts: Prompt[] = [
  // Am înlocuit exemplul cu parfumul pentru a se potrivi cu imaginile tale
  {
    id: 54, // Numărul pe care îl comunici pe social media
    slug: 'dior-sauvage-cinematic-sunset', // URL prietenos pentru SEO
    title: 'Transformare Cinematică: Dior Sauvage',
    prompt: 'product shot of Dior Sauvage perfume bottle, cinematic masterpiece, hyperrealistic, sitting on a marble slab with a reflection, city skyline in the background with a beautiful sunset, warm tones, volumetric lighting, 4k',
    imageUrl: '/sauvageafter.png', // Imaginea "After"
    beforeImageUrl: '/sauvage.webp', // Imaginea "Before"
    tags: ['Produs', 'Cinematic', 'Publicitate', 'Fotografie AI'],
    type: 'image',
  },
  {
    id: 55,
    slug: 'logo-3d-apa-youtube',
    title: 'Logo 3D din Apă pentru Brand de Băuturi',
    prompt: 'Create a hyperrealistic 3D render of the YouTube logo made entirely of liquid water. The water should form the exact shape of the logo, with dynamic, flowing contours. Enhance with splashes and realistic light refraction.',
    imageUrl: '/IMG_7997.jpg',
    // Fără beforeImageUrl, cardul se va afișa normal
    tags: ['Branding', 'Logo', '3D Render'],
    type: 'image',
  },
  {
    id: 55,
    slug: 'logo-3d-apa-youtube',
    title: 'Logo 3D din Apă pentru Brand de Băuturi',
    prompt: 'Create a hyperrealistic 3D render of the YouTube logo made entirely of liquid water. The water should form the exact shape of the logo, with dynamic, flowing contours. Enhance with splashes and realistic light refraction.',
    imageUrl: '/IMG_7997.jpg',
    // Fără beforeImageUrl, cardul se va afișa normal
    tags: ['Branding', 'Logo', '3D Render'],
    type: 'video',
  },
  // Adaugă aici prompt-urile viitoare
];