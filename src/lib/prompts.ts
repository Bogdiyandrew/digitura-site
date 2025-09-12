// lib/prompts.ts

export interface Prompt {
  slug: string;
  title: string;
  prompt: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  type: 'image' | 'video';
}

export const prompts: Prompt[] = [
  {
    slug: 'logo-3d-apa-youtube',
    title: 'Logo 3D din Apă pentru Brand de Băuturi',
    prompt: 'Create a hyperrealistic 3D render of the YouTube logo made entirely of liquid water. The water should form the exact shape of the logo, with dynamic, flowing contours. Enhance with splashes and realistic light refraction.',
    imageUrl: '/IMG_7997.jpg',
    tags: ['Branding', 'Logo', '3D Render'],
    type: 'image',
  },
  {
    slug: 'fotografie-cinematica-parfum-versace',
    title: 'Fotografie Cinematică de Produs (Parfum)',
    prompt: "Turn your perfume photo into a cinematic masterpiece. (Without a Camera) Preserves the bottle's shape, material, and label. Designed for luxury & editorial-style brands. 4K-quality output with dramatic lighting and details.",
    imageUrl: '/IMG_7995.jpg',
    videoUrl: '#', // Placeholder pentru video-ul generat cu Veo
    tags: ['Produs', 'Cinematic', 'Publicitate'],
    type: 'video', // Am setat acest prompt ca fiind de tip video
  },
  {
    slug: 'mascota-brand-gaming-opera',
    title: 'Mascotă pentru Brand de Gaming',
    prompt: 'A 3D render of the letter "O" in the style of the Opera GX browser logo, with a vibrant red color, placed on a square pedestal. The background is a colorful, blocky, low-poly landscape reminiscent of Minecraft. The lighting is bright and cheerful.',
    imageUrl: '/IMG_7996.jpg',
    tags: ['Mascotă', 'Gaming', 'ChatGPT Prompt'],
    type: 'image',
  },
  {
    slug: 'mascota-brand-gaming-opera',
    title: 'Mascotă pentru Brand de Gaming',
    prompt: 'A 3D render of the letter "O" in the style of the Opera GX browser logo, with a vibrant red color, placed on a square pedestal. The background is a colorful, blocky, low-poly landscape reminiscent of Minecraft. The lighting is bright and cheerful.',
    imageUrl: '/IMG_7996.jpg',
    tags: ['Mascotă', 'Gaming', 'ChatGPT Prompt'],
    type: 'video', // Am setat acest prompt ca fiind de tip video
  },
  
  // Adaugă aici oricâte prompt-uri dorești în viitor
];