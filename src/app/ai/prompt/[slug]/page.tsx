// src/app/ai/prompt/[slug]/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prompts } from '@/lib/prompts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PromptClientPage from './PromptClientPage';
import type { Metadata } from 'next';

// --- Funcții Speciale pentru Build și SEO ---

// 1. Spunem lui Next.js ce pagini să pre-construiască la deploy
export async function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

// 2. Generăm dinamic metadatele (titlul paginii în tab-ul browser-ului)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const prompt = prompts.find(p => p.slug === params.slug);
  
  if (!prompt) {
    return {
      title: 'Prompt negăsit',
    };
  }

  return {
    title: `${prompt.title} | Digitura AI`,
    description: `Detalii și utilizare pentru prompt-ul AI: ${prompt.title}`,
  };
}


// --- Componenta Paginii (Server Component) ---

export default function PromptPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const promptData = prompts.find(p => p.slug === slug);

  // Dacă nu găsim prompt-ul, afișăm o pagină 404
  if (!promptData) {
    notFound();
  }

  const backLink = promptData.type === 'video' ? '/ai/videos' : '/ai/images';
  const backLinkText = promptData.type === 'video' ? 'Prompt-uri Video' : 'Prompt-uri Imagini';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href={backLink} className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              Înapoi la {backLinkText}
            </Link>
          </div>
          <PromptClientPage promptData={promptData} />
        </div>
      </main>
      <Footer />
    </>
  );
}