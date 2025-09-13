// src/lib/prompts.ts

// Definim structura pe care fiecare obiect "prompt" trebuie să o respecte.
// Acest lucru ne ajută să evităm erorile când adăugăm conținut nou.
export interface Prompt {
  id: number;              // ID-ul numeric pe care îl vei folosi pe social media (ex: "DM 54")
  slug: string;            // Un text unic pentru URL, fără spații sau diacritice
  title: string;           // Titlul principal al prompt-ului
  prompt: string;          // Varianta simplă, text, a prompt-ului
  jsonPrompt?: object;     // Câmp opțional pentru varianta complexă, structurată în JSON
  imageUrl: string;        // Calea către imaginea "After" (rezultatul final) în folderul /public
  beforeImageUrl?: string; // Calea către imaginea "Before" (poza stock), opțional
  videoUrl?: string;       // Link către un video (YouTube, Vimeo sau fișier local), opțional
  tags: string[];          // O listă de etichete pentru categorisire
  type: 'image' | 'video'; // Tipul prompt-ului, pentru a-l afișa în secțiunea corectă
}

// Aceasta este "baza de date" cu toate prompt-urile tale.
// Pentru a adăuga un prompt nou, pur și simplu adaugă un nou obiect în acest array.
export const prompts: Prompt[] = [
  {
    id: 1,
    slug: 'dior-sauvage-cinematic-sunset',
    title: 'Transformare Cinematică: Dior Sauvage',
    prompt: 'product shot of Dior Sauvage perfume bottle, cinematic masterpiece, hyperrealistic, sitting on a marble slab with a reflection, city skyline in the background with a beautiful sunset, warm tones, volumetric lighting, 4k',
    jsonPrompt: {
      "task": "generate_cinematic_product_photo",
      "reference_image": "sauvage.webp",
      "product": {
        "type": "luxury perfume bottle",
        "brand": "Dior",
        "model": "Sauvage",
        "rules": "Do not alter the logo, text, shape, proportions, material, reflections, or original design. Product must remain authentic."
      },
      "positioning": {
        "orientation": "upright, centered vertically and horizontally",
        "alignment": "front-facing, perfectly aligned, logo fully legible",
        "scale": "occupies ~40% of frame",
        "surface": {
          "type": "polished white marble slab",
          "details": "subtle gray veining, beveled edges, elegant reflective finish"
        },
        "reflection": {
          "style": "mirror pool effect",
          "shape": "circular",
          "material": "metallic golden-silver tone",
          "quality": "crisp but slightly softened, inverted mirrored text legible, no distortion"
        }
      },
      "background": {
        "environment": "high-rise rooftop terrace during golden hour",
        "cityscape": {
          "style": "blurred with shallow depth of field",
          "features": "silhouettes of skyscrapers, resembling New York skyline, Empire State Building suggested"
        },
        "atmosphere": "soft haze, cinematic dreamy fog",
        "colors": ["amber", "bronze", "warm soft orange", "muted browns gradient"]
      },
      "lighting": {
        "main": "natural warm sunlight from setting sun positioned behind product",
        "rim": "subtle edge glow to create depth",
        "fill": "soft diffused bounce to evenly light front, ensure sharp logo",
        "highlights": "emphasize glass transparency and metallic shine",
        "shadows": "minimal, soft, diffused, elegant, no harsh edges"
      },
      "camera": {
        "type": "full-frame DSLR cinematic equivalent",
        "perspective": "straight-on, eye-level, distortion-free",
        "aperture": "f/1.8 – f/2.8",
        "focus": "razor-sharp on product edges, logo, surface details",
        "ratio": "1:1 square (campaign format)",
        "composition": "symmetrical, centered, with generous negative space top and bottom"
      },
      "atmosphere": {
        "tone": "luxurious, cinematic, dreamy",
        "palette": ["amber gold", "bronze", "warm orange", "neutral marble white"],
        "mood": "exclusivity, sophistication, timeless romance in a metropolis",
        "style": "luxury fragrance campaign aesthetic (Dior, Tom Ford, Cartier)"
      },
      "render": {
        "resolution": "900x900",
        "file_format": "PNG or high-quality JPEG",
        "quality": "hyperrealistic, photorealistic, professional ad-grade",
        "rules": "no distortions, no surreal alterations, preserve authenticity"
      },
      "intended_message": "The product embodies exclusivity, sophistication, and timeless elegance — balancing urban luxury with golden-hour nostalgia."
    },
    imageUrl: '/sauvageafter.png',
    beforeImageUrl: '/sauvage.webp',
    tags: ['Produs', 'Cinematic', 'Publicitate', 'JSON Prompt'],
    type: 'image',
  },
  {
    id: 55,
    slug: 'logo-3d-apa-youtube',
    title: 'Logo 3D din Apă pentru Brand de Băuturi',
    prompt: 'Create a hyperrealistic 3D render of the YouTube logo made entirely of liquid water. The water should form the exact shape of the logo, with dynamic, flowing contours. Enhance with splashes and realistic light refraction.',
    imageUrl: '/IMG_7997.jpg',
    tags: ['Branding', 'Logo', '3D Render'],
    type: 'image',
  },
  // --- POȚI ADĂUGA URMĂTORUL PROMPT AICI ---
  /*
  {
    id: 56,
    slug: 'numele-tau-unic-pentru-url',
    title: 'Titlul Noului Tău Prompt',
    prompt: 'Descrierea scurtă a prompt-ului...',
    // jsonPrompt: { ...obiectul tău JSON... }, // Opțional
    imageUrl: '/calea/catre/imaginea-after.jpg',
    beforeImageUrl: '/calea/catre/imaginea-before.jpg', // Opțional
    tags: ['Eticheta1', 'Eticheta2'],
    type: 'image', // sau 'video'
  },
  */
];