// src/lib/prompts.ts

interface JsonPrompt {
  task?: string; 
  goal?: string; 
  id?: string;
  [key: string]: unknown; 
}

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
    id: 1,
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
    imageUrl: '/sauvageafter.webp',
    beforeImageUrl: '/sauvage.webp',
    tags: ['Produs', 'Cinematic', 'Publicitate', 'JSON Prompt'],
    type: 'image',
    instructions: [
      "Deschideți ChatGPT (versiunea 4o), încărcați poza pe care vreți să o modificați și adăugați prompt-ul de mai sus.",
      "Pentru modificări, puteți schimba detaliile din prompt pentru a se potrivi produsului dvs. Dacă nu știți cum, puteți întreba ChatGPT să facă acest lucru pentru voi.",
      "Pentru întrebări suplimentare, ne puteți contacta la suport@digitura.ro."
    ],
  },
  
  // --- PROMPT-UL VIDEO ACTUALIZAT ---
  {
    id: 2,
    slug: 'dior-sauvage-video-ad-concept',
    title: 'Concept Video Publicitar: Dior Sauvage',
    jsonPrompt: {
      "id": "dior_sauvage_continuation_square_v2",
      "model": "veo-3",
      "language": "en-US",
      "goal": "Continue from the uploaded hero still into a square cinematic film for Dior Sauvage. Blend urban skyline and wild natural elements. Deliver a sense of primal energy, raw elegance, and luxury refinement in under 10 seconds.",
      "brand": { "name": "Dior", "logo_usage_rules": "Logo must remain authentic on the bottle. Do not alter proportions, materials, or typography. No overlayed text except final end-card CTA.", "legal_claims": "Avoid direct product claims. Keep message aspirational and sensory." },
      "continuation": { "starting_frame": "sauvageafter.webp", "notes": "This still image is the exact starting point. Animation begins with subtle parallax and atmospheric effects." },
      "platform": { "target": "Instagram / Facebook feed (square)", "aspect_ratio": "1:1", "duration_seconds": 10, "cta_style": "1 second end-card with: 'Dior Sauvage — The Wild Within'." },
      "output": { "resolution": "900x900", "fps": 24, "audio_loudness_target": "-14 LUFS", "container": "mp4", "codec": "h264" },
      "visual_style": { "keywords": ["cinematic", "luxury", "raw power", "urban x wilderness", "timeless elegance"], "color_palette": ["#000000", "#1C1C1C", "#6E5A46", "#CFA36C", "#FFFFFF"], "lighting": { "setup": "Golden hour base glow with shifting cooler highlights for contrast.", "fx": ["floating dust illuminated by sunlight", "subtle thundercloud flashes in the distance", "flares reflecting on the glass bottle", "soft rolling mist at ground level"] }, "lens": { "focal_length_mm": 45, "aperture": "f/1.8", "anamorphic_flares": true }, "composition": { "framing": "Bottle perfectly centered for hero dominance, with gradual reveals of skyline and wilderness merging in background.", "negative_space": "Balanced headroom for dramatic light rays and atmospheric depth." } },
      "sound": { "music": { "mood": "dark, primal, cinematic", "tempo_bpm": 88, "no_lyrics": true }, "sfx": ["deep echoing wind gusts", "low distant thunder rumbles", "stone crack shifting under pressure", "sparks of fire embers rising"], "voiceover": { "enabled": true, "script": "Dior Sauvage. The call of the wild, refined into power.", "tone": "deep, commanding, primal yet elegant" } },
      "transitions": { "default": "cinematic cut", "accent": "flash-to-black lightning cuts, dust morph dissolves, and match-cuts on light flares" },
      "shots": [ { "t_start": 0, "t_end": 2.5, "purpose": "Atmospheric awakening", "description": "Start from still frame. Parallax zoom-out with skyline glowing stronger. Light rays cut through haze.", "camera": "dolly-out with parallax", "action": "Bottle reflections animate subtly, dust motes swirl in golden light." }, { "t_start": 2.5, "t_end": 5, "purpose": "Nature emerges", "description": "City skyline blends with silhouettes of desert rocks and cracked earth. Mirage shimmer transitions across horizon.", "camera": "arc-rotate around bottle", "action": "Golden glow shifts into cooler steel tones at edges. Lightning flickers faintly in background clouds." }, { "t_start": 5, "t_end": 8, "purpose": "Primal surge", "description": "Foreground stones split with subtle crack, sparks of fire and dust rise as if energy is emanating from the bottle.", "camera": "slow push-in back toward bottle", "action": "Bottle base glows with fiery underlight, halo of mist forms at its base." }, { "t_start": 8, "t_end": 10, "purpose": "Final impact / CTA", "description": "Scene collapses into a pure black background. The bottle remains perfectly centered on marble reflection. Logo and CTA fade in elegantly.", "camera": "static", "action": "A single sweeping highlight travels across the Dior logo before fade to black." } ],
      "grading": { "look": "premium cinematic — contrasty, moody, elegant", "contrast": "high but controlled", "saturation": "low-medium with golden/cool accent mix", "highlight_rolloff": "soft, filmic", "shadow_detail": "rich, textured, never crushed" },
      "negative_prompts": [ "no distorted bottle proportions", "no artificial overlaid text except final CTA", "no cheap glow effects", "no cartoonish imagery", "no watermarks" ],
      "notes": "Designed for maximum emotional impact: the square 900x900 format enhances symmetry, keeping the bottle dominant while environment shifts seamlessly from city to wilderness. Luxury feel, primal undertones, cinematic storytelling."
    },
    imageUrl: '/sauvageafter.webp',
    videoUrl: '/videos/dior-video.mp4',
    tags: ['Video', 'Publicitate', 'Concept', 'Veo'],
    type: 'video',
    instructions: [
      "Acest prompt este un concept pentru unelte AI de generare video precum Google Veo, Pika Labs sau RunwayML.",
      "Încărcați imaginea 'After' ca punct de plecare în unealta AI.",
      "Copiați și adaptați detaliile din prompt pentru a ghida animația și efectele video.",
      "Acest tip de conținut este ideal pentru reclame scurte pe social media (Reels, TikTok, Shorts)."
    ]
  },
];