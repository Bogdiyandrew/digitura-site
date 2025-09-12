// src/app/ai/images/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { prompts } from '@/lib/prompts'; // Importăm datele
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ImagePromptsPage = () => {
  const imagePrompts = prompts.filter(p => p.type === 'image');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link href="/ai" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              Înapoi la Laborator AI
            </Link>
            <h1 className="text-4xl font-bold mt-4 text-white">Prompt-uri pentru Imagini</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imagePrompts.map((p) => (
              <PromptCard 
                key={p.slug}
                {...p}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImagePromptsPage;