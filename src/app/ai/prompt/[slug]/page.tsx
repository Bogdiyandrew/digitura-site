// src/app/ai/prompt/[slug]/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prompts } from '@/lib/prompts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PromptClientPage from './PromptClientPage'; // Importăm componenta client

// Props pentru pagina noastră
interface PromptPageProps {
  params: {
    slug: string;
  };
}

// Componenta principală a paginii (acum o Componentă Server)
const PromptPage = ({ params }: PromptPageProps) => {
  const { slug } = params; // Accesarea aici este corectă pentru Server Components
  const promptData = prompts.find(p => p.slug === slug);

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
          {/* Trimitem datele către componenta client pentru a fi afișate */}
          <PromptClientPage promptData={promptData} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PromptPage;