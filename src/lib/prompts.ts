// src/lib/prompts.ts

// Definim o interfață specifică pentru obiectul JSON
interface JsonPrompt {
  task: string;
  // --- MODIFICARE AICI ---
  // Am înlocuit 'any' cu 'unknown' pentru a respecta regula ESLint.
  [key: string]: unknown; 
}

// Actualizăm interfața principală
export interface Prompt {
  id: number;
  slug: string;
  title: string;
  jsonPrompt: JsonPrompt;
  imageUrl: string;
  beforeImageUrl?: string;
  videoUrl?: string;
  tags: string[];
  type: 'image' | 'video';
  instructions?: string[];
}

export const prompts: Prompt[] = [
  {
    id: 54,
    slug: 'dior-sauvage-cinematic-sunset',
    title: 'Transformare Cinematică: Dior Sauvage',
    jsonPrompt: {
      "task": "generate_cinematic_product_photo",
      "reference_image": "sauvage.webp",
      "product": { "type": "luxury perfume bottle", "brand": "Dior", "model": "Sauvage", "rules": "Do not alter the logo, text, shape, proportions, material, reflections, or original design. Product must remain authentic." },
      "positioning": { "orientation": "upright, centered vertically and horizontally", "alignment": "front-facing, perfectly aligned, logo fully legible", "scale": "occupies ~40% of frame", "surface": { "type": "polished white marble slab", "details": "subtle gray veining, beveled edges, elegant reflective finish" }, "reflection": { "style": "mirror pool effect", "shape": "circular", "material": "metallic golden-silver tone", "quality": "crisp but slightly softened, inverted mirrored text legible, no distortion" } },
      "background": { "environment": "high-rise rooftop terrace during golden hour", "cityscape": { "style": "blurred with shallow depth of field", "features": "silhouettes of skyscrapers, resembling New York skyline, Empire State Building suggested" }, "atmosphere": "soft haze, cinematic dreamy fog", "colors": ["amber", "bronze", "warm soft orange", "muted browns gradient"] },
      "lighting": { "main": "natural warm sunlight from setting sun positioned behind product", "rim": "subtle edge glow to create depth", "fill": "soft diffused bounce to evenly light front, ensure sharp logo", "highlights": "emphasize glass transparency and metallic shine", "shadows": "minimal, soft, diffused, elegant, no harsh edges" },
      "camera": { "type": "full-frame DSLR cinematic equivalent", "perspective": "straight-on, eye-level, distortion-free", "aperture": "f/1.8 – f/2.8", "focus": "razor-sharp on product edges, logo, surface details", "ratio": "1:1 square (campaign format)", "composition": "symmetrical, centered, with generous negative space top and bottom" },
      "atmosphere": { "tone": "luxurious, cinematic, dreamy", "palette": ["amber gold", "bronze", "warm orange", "neutral marble white"], "mood": "exclusivity, sophistication, timeless romance in a metropolis", "style": "luxury fragrance campaign aesthetic (Dior, Tom Ford, Cartier)" },
      "render": { "resolution": "900x900", "file_format": "PNG or high-quality JPEG", "quality": "hyperrealistic, photorealistic, professional ad-grade", "rules": "no distortions, no surreal alterations, preserve authenticity" },
      "intended_message": "The product embodies exclusivity, sophistication, and timeless elegance — balancing urban luxury with golden-hour nostalgia."
    },
    imageUrl: '/image_3c865a.jpg',
    beforeImageUrl: '/sauvage.webp',
    tags: ['Produs', 'Cinematic', 'Publicitate', 'JSON Prompt'],
    type: 'image',
    instructions: [
      "Deschideți ChatGPT (versiunea 4o), încărcați poza pe care vreți să o modificați și adăugați prompt-ul de mai sus.",
      "Pentru modificări, puteți schimba detaliile din prompt pentru a se potrivi produsului dvs. Dacă nu știți cum, puteți întreba ChatGPT să facă acest lucru pentru voi.",
      "Pentru întrebări suplimentare, ne puteți contacta la suport@digitura.ro."
    ],
  },
  {
    id: 55,
    slug: 'logo-3d-apa-youtube',
    title: 'Logo 3D din Apă pentru Brand de Băuturi',
    jsonPrompt: {
        "task": "Generate a hyperrealistic 3D render of the YouTube logo made of liquid water.",
        "details": "The water should form the exact shape of the logo, with dynamic, flowing contours.",
        "effects": "Enhance with splashes and realistic light refraction."
    },
    imageUrl: '/IMG_7997.jpg',
    tags: ['Branding', 'Logo', '3D Render'],
    type: 'image',
  },
];