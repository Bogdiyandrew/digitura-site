import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import Script from "next/script"; // Import necesar pentru JSON-LD

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Definim URL-ul de bază pentru a evita problemele de canonical
const baseUrl = "https://digitura.ro";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  // 2. TITLU OPTIMIZAT: Cuvinte cheie principale + Brand
  // Template-ul ajută ca paginile interne să fie: "Contact | Digitura - Agenție..."
  title: {
    default: "Digitura - Agenție Web Design & Creare Site Web Profesional",
    template: "%s | Digitura - Agenție Web Design",
  },

  // 3. DESCRIERE DE VANZARE: Include cuvinte cheie și un "call to action"
  description: "Transformăm vizitatorii în clienți prin servicii complete de web design, creare site-uri de prezentare, magazine online și optimizare SEO. Cere o ofertă gratuită!",

  // 4. CUVINTE CHEIE (Google le ignoră adesea, dar alte motoare nu)
  keywords: [
    "agentie web design",
    "creare site web",
    "realizare magazin online",
    "web design romania",
    "optimizare seo",
    "servicii web",
    "digitura"
  ],

  // 5. OPEN GRAPH (Cum arată când dai Share pe Facebook/LinkedIn/WhatsApp)
  openGraph: {
    title: "Digitura - Servicii profesionale de Web Design",
    description: "Creăm site-uri rapide și optimizate care vând. Ai nevoie de un site nou sau de un redesign? Intră să vezi portofoliul.",
    url: baseUrl,
    siteName: "Digitura",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/digiutralogo.png", // Recomand să creezi o imagine 1200x630px pentru share
        width: 1200,
        height: 630,
        alt: "Digitura Web Design Agency",
      },
    ],
  },

  // 6. ROBOTS (Asigură-te că Google are voie să te indexeze)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/digituralogo.png',
    shortcut: '/digituralogo.png',
    apple: '/digituralogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Sau "LocalBusiness"
    "name": "Digitura",
    "image": `${baseUrl}/digituralogo.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "+40750488329",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RO",
      "addressLocality": "Piteşti" 
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/digitura", 
      "https://www.instagram.com/digitura",
      "https://www.linkedin.com/company/digitura"
    ]
  };

  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Injectăm Schema.org */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <LenisSmoothScroll>
          {children}
        </LenisSmoothScroll>
      </body>
    </html>
  );
}